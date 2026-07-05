"use client";

import { useEffect } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface FormulaBlockProps {
  formula: string;
  display?: boolean;
  className?: string;
}

export default function FormulaBlock({ formula, display = false, className = "" }: FormulaBlockProps) {
  useEffect(() => {
    try {
      const container = document.activeElement === document.body ? null : null;
      // KaTeX is already imported, just ensure CSS is loaded
    } catch {
      // Silently fail if KaTeX is not available
    }
  }, [formula]);

  try {
    const html = katex.renderToString(formula, {
      displayMode: display,
      throwOnError: false,
    });
    return (
      <div
        className={`my-4 ${display ? "overflow-x-auto" : ""} ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch {
    return (
      <code className={`text-sm ${display ? "block" : "inline"} px-2 py-1 bg-muted rounded`}>
        {formula}
      </code>
    );
  }
}
