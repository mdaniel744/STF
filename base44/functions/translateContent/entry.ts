import { createClientFromRequest } from 'npm:@base44/sdk@0.8.38';

const LANGUAGE_NAMES = {
  en: 'English',
  nl: 'Dutch',
  de: 'German',
  fr: 'French',
  es: 'Spanish'
};

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return String(Math.abs(hash));
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { texts, target_language, source_language = 'en' } = body;

    if (!texts || !Array.isArray(texts) || !target_language) {
      return Response.json({ error: 'texts array and target_language required' }, { status: 400 });
    }

    if (texts.length > 50) {
      return Response.json({ error: 'Too many texts. Maximum 50 per request.' }, { status: 400 });
    }

    if (target_language === source_language) {
      const result = {};
      texts.forEach((text, i) => { result[i] = text; });
      return Response.json({ translations: result });
    }

    const hashes = texts.map(text => simpleHash(text + '|' + target_language));

    const cached = await base44.asServiceRole.entities.Translation.filter({
      target_language,
      source_hash: { $in: hashes }
    });

    const translations = {};
    const uncached = [];

    texts.forEach((text, i) => {
      const hash = hashes[i];
      const found = cached.find(c => c.source_hash === hash);
      if (found) {
        translations[i] = found.translated_text;
      } else {
        uncached.push({ index: i, text, hash });
      }
    });

    if (uncached.length > 0) {
      const targetName = LANGUAGE_NAMES[target_language] || target_language;
      const sourceName = LANGUAGE_NAMES[source_language] || 'English';

      const textBlock = uncached.map(item => `[${item.index}] ${item.text}`).join('\n\n---\n\n');

      const prompt = `You are a professional translator for a shipping container e-commerce website (STF Container B.V., Netherlands). Translate the following texts from ${sourceName} to ${targetName}.

IMPORTANT RULES:
- Maintain all markdown formatting (headings, bold, lists, etc.)
- Maintain all HTML tags if present
- Do not translate URLs, email addresses, or phone numbers
- Keep product codes and specifications (like "20ft", "40ft", "ISO", "-25°C") as-is
- Translate naturally and professionally for a B2B audience
- Each text is prefixed with [index] — use that index as the JSON key

Return ONLY a JSON object where keys are the index numbers (as strings) and values are the translated texts. Do not include any other text.

Texts to translate:
${textBlock}`;

      const properties = {};
      const required = [];
      uncached.forEach(item => {
        properties[String(item.index)] = { type: 'string' };
        required.push(String(item.index));
      });

      const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: 'object',
          properties,
          required
        }
      });

      const llmTranslations = result || {};

      const cacheRecords = [];
      for (const item of uncached) {
        const translated = llmTranslations[String(item.index)] || item.text;
        translations[item.index] = translated;
        cacheRecords.push({
          source_hash: item.hash,
          source_text: item.text,
          target_language,
          source_language,
          translated_text: translated
        });
      }

      if (cacheRecords.length > 0) {
        try {
          await base44.asServiceRole.entities.Translation.bulkCreate(cacheRecords);
        } catch (e) {
          // Cache save failure is non-fatal
        }
      }
    }

    return Response.json({ translations });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});