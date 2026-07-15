"use client";

import { Suspense } from "react";
import FormulaBlock from "./FormulaBlock";

interface MDXContentProps {
  content: string;
  visualizations?: Array<{ id: string; config?: Record<string, any> }>;
}

function FormulaInline({ formula }: { formula: string }) {
  return <FormulaBlock formula={formula} />;
}

function FormulaDisplay({ formula }: { formula: string }) {
  return <FormulaBlock formula={formula} display />;
}

function VisualizationBlock({ id, config }: { id: string; config?: Record<string, any> }) {
  return (
    <div className="my-6 rounded-xl border border-border bg-card p-6">
      <div className="text-center text-sm text-muted-foreground">
        交互组件: {id}
        {config && Object.keys(config).length > 0 && (
          <pre className="text-xs mt-2 text-left text-muted-foreground/70">{JSON.stringify(config, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}

function renderContent(content: string) {
  // Simple MDX-like rendering: parse special blocks
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeContent = "";
  let codeKey = 0;
  let inFormula = false;
  let formulaContent = "";
  let formulaKey = 0;
  let inViz = false;
  let vizId = "";
  let vizConfig: Record<string, any> = {};
  let vizKey = 0;
  let paragraphLines: string[] = [];
  let paragraphKey = 0;

  function flushParagraph() {
    if (paragraphLines.length > 0) {
      const text = paragraphLines.join("\n");
      if (text.trim()) {
        elements.push(
          <p key={`p-${paragraphKey++}`} className="mb-4 leading-relaxed">
            {renderInlineMath(text)}
          </p>
        );
      }
      paragraphLines = [];
    }
  }

  function renderInlineMath(text: string): React.ReactNode[] {
    // Simple inline math: $...$
    const parts: React.ReactNode[] = [];
    const regex = /\$([^$]+)\$/g;
    let lastIdx = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIdx) {
        parts.push(text.slice(lastIdx, match.index));
      }
      parts.push(<FormulaInline key={`fm-${match.index}`} formula={match[1]} />);
      lastIdx = regex.lastIndex;
    }

    if (lastIdx < text.length) {
      parts.push(text.slice(lastIdx));
    }

    return parts.length > 0 ? parts : [text];
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${codeKey++}`} className="my-4 rounded-lg bg-muted/50 p-4 overflow-x-auto text-sm font-mono">
            <code>{codeContent}</code>
          </pre>
        );
        codeContent = "";
        inCodeBlock = false;
      } else {
        flushParagraph();
        inCodeBlock = true;
      }
      continue;
    }

    // Formula block: $$...$$
    if (line.startsWith("$$") && line.endsWith("$$") && line.length > 2) {
      flushParagraph();
      elements.push(
        <FormulaDisplay key={`fd-${formulaKey++}`} formula={line.slice(2, -2)} />
      );
      continue;
    }

    // Visualization block
    if (line.startsWith("<!-- viz:")) {
      flushParagraph();
      inViz = true;
      const match = line.match(/viz:(\S+)(.*)/);
      if (match) {
        vizId = match[1];
        try {
          vizConfig = JSON.parse(match[2].trim() || "{}");
        } catch {
          vizConfig = {};
        }
      }
      continue;
    }
    if (line.trim() === "<!-- viz:end -->") {
      elements.push(
        <VisualizationBlock key={`viz-${vizKey++}`} id={vizId} config={vizConfig} />
      );
      inViz = false;
      vizId = "";
      vizConfig = {};
      continue;
    }

    // Headings
    if (line.startsWith("# ")) {
      flushParagraph();
      elements.push(<h1 key={`h1-${i}`} className="text-3xl font-bold mt-8 mb-4">{renderInlineMath(line.slice(2))}</h1>);
      continue;
    }
    if (line.startsWith("## ")) {
      flushParagraph();
      elements.push(<h2 key={`h2-${i}`} className="text-2xl font-semibold mt-6 mb-3">{renderInlineMath(line.slice(3))}</h2>);
      continue;
    }
    if (line.startsWith("### ")) {
      flushParagraph();
      elements.push(<h3 key={`h3-${i}`} className="text-xl font-semibold mt-4 mb-2">{renderInlineMath(line.slice(4))}</h3>);
      continue;
    }

    // Lists
    if (line.startsWith("- ")) {
      flushParagraph();
      elements.push(
        <li key={`li-${i}`} className="ml-4 list-disc">{renderInlineMath(line.slice(2))}</li>
      );
      continue;
    }
    if (line.match(/^\d+\.\s/)) {
      flushParagraph();
      const num = parseInt(line.match(/^(\d+)\./)?.[1] || "0");
      elements.push(
        <li key={`ol-${i}-${num}`} className="ml-4 list-decimal">
          {renderInlineMath(line.replace(/^\d+\.\s/, ""))}
        </li>
      );
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      flushParagraph();
      elements.push(
        <blockquote key={`bq-${i}`} className="border-l-4 border-accent/30 pl-4 my-4 text-muted-foreground italic">
          {renderInlineMath(line.slice(2))}
        </blockquote>
      );
      continue;
    }

    // Horizontal rule
    if (line.trim() === "---") {
      flushParagraph();
      elements.push(<hr key={`hr-${i}`} className="my-6 border-border" />);
      continue;
    }

    if (inCodeBlock) {
      codeContent += (codeContent ? "\n" : "") + line;
    } else if (inViz) {
      // skip config lines inside viz block
    } else {
      if (line.trim() === "") {
        flushParagraph();
      } else {
        paragraphLines.push(line);
      }
    }
  }

  // Flush remaining
  if (inCodeBlock) {
    elements.push(
      <pre key={`code-end`} className="my-4 rounded-lg bg-muted/50 p-4 overflow-x-auto text-sm font-mono">
        <code>{codeContent}</code>
      </pre>
    );
  }
  flushParagraph();

  return <div className="prose dark:prose-invert max-w-none">{elements}</div>;
}

export default function MDXContent({ content, visualizations }: MDXContentProps) {
  return renderContent(content);
}
