import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

const PROJECT_ROOT = process.cwd();
const SOURCE_PATH = path.join(PROJECT_ROOT, "src", "components", "containers", "SEOSection.jsx");
const OUTPUT_PATH = path.join(PROJECT_ROOT, "src", "data", "seo-content-locales.js");
const CONTENT_KEYS = [
  "general",
  "Standard",
  "High Cube",
  "Open Side",
  "Office",
  "Storage",
  "Refrigerated",
  "10ft",
  "20ft",
  "40ft",
];
const TARGET_LANGUAGES = ["nl", "de", "fr", "es"];
const MAX_CHUNK_LENGTH = 3800;
const WORKER_COUNT = 2;
const BACKTICK = String.fromCharCode(96);

function keyToken(key) {
  return key.includes(" ") || /^\d/.test(key)
    ? "  \"" + key + "\": {"
    : "  " + key + ": {";
}

function extractEnglishContent(source) {
  const objectStart = source.indexOf("const SEO_CONTENT = {");
  const objectEnd = source.indexOf("\n};\n\nconst NL_SEO_CONTENT", objectStart);

  if (objectStart === -1 || objectEnd === -1) {
    throw new Error("Could not locate SEO_CONTENT in SEOSection.jsx");
  }

  const objectSource = source.slice(objectStart, objectEnd);
  const markdownPattern = new RegExp("markdown: " + BACKTICK + "([\\s\\S]*?)" + BACKTICK + ",");
  const collapsePattern = new RegExp("markdown_collapse: " + BACKTICK + "([\\s\\S]*?)" + BACKTICK + ",");
  const content = {};

  CONTENT_KEYS.forEach((key, keyIndex) => {
    const start = objectSource.indexOf(keyToken(key));
    const followingStarts = CONTENT_KEYS.slice(keyIndex + 1)
      .map((nextKey) => objectSource.indexOf(keyToken(nextKey), start + keyToken(key).length))
      .filter((index) => index > start);
    const end = followingStarts.length ? Math.min(...followingStarts) : objectSource.length;
    const block = objectSource.slice(start, end);
    const label = block.match(/label: "([^"]+)"/)?.[1];
    const markdown = block.match(markdownPattern)?.[1];
    const markdownCollapse = block.match(collapsePattern)?.[1];

    if (!label || !markdown) {
      throw new Error("Could not parse SEO content for " + key);
    }

    content[key] = {
      label,
      markdown,
      ...(markdownCollapse ? { markdown_collapse: markdownCollapse } : {}),
    };
  });

  return content;
}

function splitLongBlock(block) {
  if (block.length <= MAX_CHUNK_LENGTH) return [block];

  const lines = block.split("\n");
  const chunks = [];
  let current = "";

  lines.forEach((line) => {
    const candidate = current ? current + "\n" + line : line;
    if (candidate.length <= MAX_CHUNK_LENGTH) {
      current = candidate;
      return;
    }

    if (current) chunks.push(current);
    current = line;
  });

  if (current) chunks.push(current);
  return chunks;
}

function splitMarkdown(markdown) {
  const blocks = markdown.replace(/\r\n/g, "\n").split(/\n{2,}/);
  const chunks = [];
  let current = "";

  blocks.flatMap(splitLongBlock).forEach((block) => {
    const candidate = current ? current + "\n\n" + block : block;
    if (candidate.length <= MAX_CHUNK_LENGTH) {
      current = candidate;
      return;
    }

    if (current) chunks.push(current);
    current = block;
  });

  if (current) chunks.push(current);
  return chunks;
}

function translatedTextFromResponse(payload) {
  if (!Array.isArray(payload?.[0])) {
    throw new Error("Translation service returned an unexpected response");
  }

  return payload[0].map((segment) => segment?.[0] || "").join("").trim();
}

function normalizeTerminology(text, language) {
  const replacements = {
    nl: [
      [/Open Side Shipping Containers/g, "Open Side-containers"],
      [/Open Side Shipping Container/g, "Open Side-container"],
      [/verzendcontainers/gi, "zeecontainers"],
      [/verzendcontainer/gi, "zeecontainer"],
      [/transportcontainers/gi, "zeecontainers"],
      [/transportcontainer/gi, "zeecontainer"],
    ],
    de: [
      [/Open Side Shipping Containers/g, "Open-Side-Container"],
      [/Open Side Shipping Container/g, "Open-Side-Container"],
      [/Standard-Versandbehälter/g, "Standard-Seecontainer"],
      [/Standard-Transportcontainer/g, "Standard-Seecontainer"],
      [/Standard-Versandcontainer/g, "Standard-Seecontainer"],
      [/Versandbehälter/g, "Seecontainer"],
      [/Transportcontainer/g, "Seecontainer"],
      [/Versandcontainer/g, "Seecontainer"],
      [/Containerkonvertierungsprojekte/g, "Container-Umbauprojekte"],
    ],
    fr: [
      [/Office Containers/g, "conteneurs bureaux"],
      [/Office Container/g, "conteneur bureau"],
      [/conteneurs d'expédition/gi, "conteneurs maritimes"],
      [/conteneur d'expédition/gi, "conteneur maritime"],
      [/conteneurs de transport/gi, "conteneurs maritimes"],
      [/conteneur de transport/gi, "conteneur maritime"],
    ],
    es: [
      [/contenedores de envío/gi, "contenedores marítimos"],
      [/contenedor de envío/gi, "contenedor marítimo"],
      [/contenedores de transporte/gi, "contenedores marítimos"],
      [/contenedor de transporte/gi, "contenedor marítimo"],
    ],
  };

  const normalizedMarkdown = text.replace(/^\*(?!\*)(?=\S)/gm, "* ");

  return (replacements[language] || []).reduce(
    (result, [pattern, replacement]) => result.replace(pattern, replacement),
    normalizedMarkdown,
  );
}

function alignMarkdownStructure(source, translation) {
  const sourceLines = source.split("\n");
  const translatedLines = translation.split("\n");

  if (sourceLines.length !== translatedLines.length) {
    throw new Error(
      "Translated Markdown line count changed from " + sourceLines.length +
        " to " + translatedLines.length,
    );
  }

  return translatedLines.map((line, index) => {
    const sourceIsBullet = sourceLines[index].startsWith("* ");
    const targetIsBullet = line.startsWith("* ");

    if (sourceIsBullet && !targetIsBullet) {
      return "* " + line.replace(/^\*\s*/, "");
    }
    if (!sourceIsBullet && targetIsBullet) {
      return line.slice(2);
    }
    return line;
  }).join("\n");
}

async function translateChunk(text, targetLanguage) {
  const body = new URLSearchParams({
    client: "gtx",
    sl: "en",
    tl: targetLanguage,
    dt: "t",
    q: text,
  });

  let lastError;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch("https://translate.googleapis.com/translate_a/single", {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
          "user-agent": "STF-Container-SEO-Translation-Generator/1.0",
        },
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error("Translation request failed with HTTP " + response.status);
      }

      return normalizeTerminology(
        translatedTextFromResponse(await response.json()),
        targetLanguage,
      );
    } catch (error) {
      lastError = error;
      if (attempt < 4) {
        const delay = error.message?.includes("HTTP 429") ? attempt * 5000 : attempt * 750;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

async function translateMarkdown(markdown, targetLanguage) {
  const chunks = splitMarkdown(markdown);
  const translatedChunks = [];

  for (const chunk of chunks) {
    translatedChunks.push(await translateChunk(chunk, targetLanguage));
  }

  return translatedChunks.join("\n\n");
}

function validateTranslations(englishContent, localizedContent) {
  for (const language of TARGET_LANGUAGES) {
    for (const key of CONTENT_KEYS) {
      const englishEntry = englishContent[key];
      const localizedEntry = localizedContent[language]?.[key];

      if (!localizedEntry?.markdown) {
        throw new Error("Missing " + language + "." + key + ".markdown");
      }

      if (Boolean(englishEntry.markdown_collapse) !== Boolean(localizedEntry.markdown_collapse)) {
        throw new Error("Expanded content mismatch for " + language + "." + key);
      }

      for (const field of ["markdown", "markdown_collapse"]) {
        if (!englishEntry[field]) continue;
        const lengthRatio = localizedEntry[field].length / englishEntry[field].length;
        if (lengthRatio < 0.55) {
          throw new Error(
            language + "." + key + "." + field +
              " is unexpectedly short (" + lengthRatio.toFixed(2) + ")",
          );
        }
      }
    }
  }
}

async function runPreview(englishContent) {
  const sample = splitMarkdown(englishContent.Standard.markdown)[0];
  const translated = await translateChunk(sample, "de");
  console.log(translated);
}

async function writeTranslations(localizedContent) {
  const output = [
    "// Generated from the complete English SEO source in SEOSection.jsx.",
    "// Run node scripts/generate-seo-translations.mjs to regenerate.",
    "export const localizedSEOContent = " + JSON.stringify(localizedContent, null, 2) + ";",
    "",
  ].join("\n");

  await writeFile(OUTPUT_PATH, output, "utf8");
  console.log("Wrote " + OUTPUT_PATH);
}

async function normalizeExistingTranslations(englishContent) {
  const moduleUrl = pathToFileURL(OUTPUT_PATH).href + "?normalize=" + Date.now();
  const { localizedSEOContent } = await import(moduleUrl);

  for (const language of TARGET_LANGUAGES) {
    for (const key of CONTENT_KEYS) {
      for (const field of ["markdown", "markdown_collapse"]) {
        if (!localizedSEOContent[language][key][field]) continue;
        localizedSEOContent[language][key][field] = alignMarkdownStructure(
          englishContent[key][field],
          normalizeTerminology(
            localizedSEOContent[language][key][field],
            language,
          ),
        );
      }
    }
  }

  validateTranslations(englishContent, localizedSEOContent);
  await writeTranslations(localizedSEOContent);
}

async function generateTranslations(englishContent) {
  const localizedContent = Object.fromEntries(
    TARGET_LANGUAGES.map((language) => [language, {}]),
  );
  const jobs = [];

  for (const language of TARGET_LANGUAGES) {
    for (const key of CONTENT_KEYS) {
      localizedContent[language][key] = {
        label: englishContent[key].label,
      };

      for (const field of ["markdown", "markdown_collapse"]) {
        if (!englishContent[key][field]) continue;
        jobs.push({ language, key, field, text: englishContent[key][field] });
      }
    }
  }

  let nextJob = 0;
  let completedJobs = 0;

  async function worker() {
    while (nextJob < jobs.length) {
      const job = jobs[nextJob];
      nextJob += 1;
      const chunks = splitMarkdown(job.text).length;
      console.log(
        "[" + job.language + "] " + job.key + "." + job.field +
          " (" + chunks + " chunk" + (chunks === 1 ? "" : "s") + ")",
      );
      localizedContent[job.language][job.key][job.field] = alignMarkdownStructure(
        job.text,
        await translateMarkdown(job.text, job.language),
      );
      completedJobs += 1;
      console.log("Completed " + completedJobs + "/" + jobs.length);
    }
  }

  await Promise.all(Array.from({ length: WORKER_COUNT }, () => worker()));
  validateTranslations(englishContent, localizedContent);

  await writeTranslations(localizedContent);
}

const source = await readFile(SOURCE_PATH, "utf8");
const englishContent = extractEnglishContent(source);

if (process.argv.includes("--preview")) {
  await runPreview(englishContent);
} else if (process.argv.includes("--normalize-existing")) {
  await normalizeExistingTranslations(englishContent);
} else {
  await generateTranslations(englishContent);
}
