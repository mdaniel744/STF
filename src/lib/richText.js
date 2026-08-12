// Plain-text extraction for compact/truncated contexts (cards, overlays)
// where rendering full rich HTML risks breaking a line-clamped layout
// (e.g. a table cut off mid-row). Uses DOMParser, not dangerouslySetInnerHTML,
// so there's no script-execution risk - this only ever reads .textContent.
export function stripHtmlToText(html) {
  if (!html) return "";
  if (typeof window === "undefined") return html.replace(/<[^>]*>/g, "");
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}
