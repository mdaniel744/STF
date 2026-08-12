"use client";

import { useEffect, useState } from "react";

// Sanitizes and renders HTML from the dashboard's rich-text editor.
// DOMPurify only works in the browser (it needs a real DOM), so this
// stays empty until mounted client-side - safe since these fields are
// never critical for SEO/first-paint the way page titles are.
export default function RichText({ html, className = "" }) {
  const [clean, setClean] = useState("");

  useEffect(() => {
    if (!html) {
      setClean("");
      return;
    }
    import("dompurify").then(({ default: DOMPurify }) => {
      setClean(DOMPurify.sanitize(html));
    });
  }, [html]);

  if (!clean) return null;
  return <div className={`rich-text ${className}`} dangerouslySetInnerHTML={{ __html: clean }} />;
}
