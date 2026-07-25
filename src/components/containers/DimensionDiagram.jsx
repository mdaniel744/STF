import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

/**
 * Renders a technical dimension diagram (SVG) for a container product.
 * Shows external length, width, and height with measurement labels.
 */
export default function DimensionDiagram({ product }) {
  const { language } = useLanguage();
  const length = product?.specs_length || "";
  const width = product?.specs_width || "";
  const height = product?.specs_height || "";
  const size = product?.container_size || "";
  const labels = {
    nl: { length: "L", height: "H", width: "B" },
    en: { length: "L", height: "H", width: "W" },
    fr: { length: "L", height: "H", width: "l" },
    de: { length: "L", height: "H", width: "B" },
    es: { length: "L", height: "A", width: "An" },
  }[language] || { length: "L", height: "H", width: "W" };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <svg viewBox="0 0 600 400" className="w-full h-full max-w-md" xmlns="http://www.w3.org/2000/svg">
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="600" height="400" fill="url(#grid)" />

        {/* Container body - isometric-style side view */}
        {/* Main container box */}
        <rect x="120" y="120" width="360" height="160" fill="#0F3B6D" stroke="#082952" strokeWidth="2" rx="2" />

        {/* Corrugation lines */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
          <line
            key={i}
            x1={135 + i * 29}
            y1={130}
            x2={135 + i * 29}
            y2={270}
            stroke="#1E4478"
            strokeWidth="1.5"
          />
        ))}

        {/* Door panel (right side) */}
        <rect x="445" y="125" width="30" height="150" fill="#082952" stroke="#041A37" strokeWidth="1.5" rx="1" />
        {/* Door handles */}
        <line x1="460" y1="160" x2="460" y2="240" stroke="#F58220" strokeWidth="3" />
        <circle cx="460" cy="165" r="3" fill="#F58220" />
        <circle cx="460" cy="235" r="3" fill="#F58220" />

        {/* Top edge highlight */}
        <line x1="120" y1="120" x2="480" y2="120" stroke="#2B5690" strokeWidth="2" />

        {/* Ground line */}
        <line x1="80" y1="285" x2="520" y2="285" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Length dimension (bottom) */}
        <line x1="120" y1="310" x2="480" y2="310" stroke="#F58220" strokeWidth="1.5" />
        <line x1="120" y1="300" x2="120" y2="320" stroke="#F58220" strokeWidth="1.5" />
        <line x1="480" y1="300" x2="480" y2="320" stroke="#F58220" strokeWidth="1.5" />
        <text x="300" y="330" textAnchor="middle" fill="#0F3B6D" fontSize="14" fontWeight="600" fontFamily="monospace">
          {labels.length}: {length}
        </text>

        {/* Height dimension (left) */}
        <line x1="90" y1="120" x2="90" y2="280" stroke="#F58220" strokeWidth="1.5" />
        <line x1="80" y1="120" x2="100" y2="120" stroke="#F58220" strokeWidth="1.5" />
        <line x1="80" y1="280" x2="100" y2="280" stroke="#F58220" strokeWidth="1.5" />
        <text x="75" y="205" textAnchor="middle" fill="#0F3B6D" fontSize="14" fontWeight="600" fontFamily="monospace" transform="rotate(-90 75 205)">
          {labels.height}: {height}
        </text>

        {/* Width label (top) */}
        <text x="300" y="105" textAnchor="middle" fill="#0F3B6D" fontSize="14" fontWeight="600" fontFamily="monospace">
          {labels.width}: {width}
        </text>

        {/* Size badge */}
        <rect x="250" y="175" width="100" height="30" fill="white" fillOpacity="0.95" rx="4" />
        <text x="300" y="195" textAnchor="middle" fill="#0F3B6D" fontSize="16" fontWeight="700" fontFamily="monospace">
          {size}
        </text>
      </svg>
    </div>
  );
}
