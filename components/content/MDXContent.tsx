"use client";

import FormulaBlock from "./FormulaBlock";

interface MDXContentProps {
  content: string;
  skipFirstH1?: boolean;
}

// ── Inline renderers ──────────────────────────────────────────────────────────

function renderInlineMath(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\$([^$\n]+)\$/g;
  let lastIdx = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) parts.push(renderInlineFormatting(text.slice(lastIdx, match.index), key++));
    parts.push(<FormulaBlock key={`im-${key++}`} formula={match[1]} />);
    lastIdx = regex.lastIndex;
  }
  if (lastIdx < text.length) parts.push(renderInlineFormatting(text.slice(lastIdx), key++));
  return parts.length ? parts : [text];
}

function renderInlineFormatting(text: string, baseKey: number): React.ReactNode {
  // Handle **bold** and *italic*
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let k = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[2]) parts.push(<strong key={`b-${baseKey}-${k++}`}>{match[2]}</strong>);
    else if (match[3]) parts.push(<em key={`i-${baseKey}-${k++}`}>{match[3]}</em>);
    else if (match[4]) parts.push(<code key={`c-${baseKey}-${k++}`} style={{ background: "#f3f4f6", padding: "0.1em 0.35em", borderRadius: "0.25em", fontSize: "0.88em" }}>{match[4]}</code>);
    last = regex.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

// ── Table parser ──────────────────────────────────────────────────────────────

function parseTable(lines: string[]): React.ReactNode {
  if (lines.length < 2) return null;

  const parseRow = (line: string) =>
    line.split("|").slice(1, -1).map((c) => c.trim());

  const headers = parseRow(lines[0]);
  const body = lines.slice(2); // skip separator row

  return (
    <div style={{ overflowX: "auto", margin: "1.25rem 0" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{
                padding: "0.5rem 0.75rem",
                textAlign: "left",
                borderBottom: "2px solid #e5e7eb",
                fontWeight: 600,
                color: "#374151",
              }}>
                {renderInlineMath(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: "1px solid #f3f4f6" }}>
              {parseRow(row).map((cell, ci) => (
                <td key={ci} style={{ padding: "0.5rem 0.75rem", color: "#374151" }}>
                  {renderInlineMath(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Main renderer ─────────────────────────────────────────────────────────────

function renderContent(content: string, skipFirstH1 = false): React.ReactNode {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];

  let key = 0;
  const k = () => key++;

  // State
  let inCode = false;
  let codeLines: string[] = [];
  let codeLang = "";

  let inFormula = false;
  let formulaLines: string[] = [];

  let paragraphLines: string[] = [];
  let tableLines: string[] = [];
  let inTable = false;
  let listItems: { node: React.ReactNode }[] = [];
  let listType: "ul" | "ol" | null = null;
  let firstH1Skipped = false;

  function flushParagraph() {
    if (paragraphLines.length === 0) return;
    const text = paragraphLines.join(" ").trim();
    if (text) {
      elements.push(
        <p key={k()} style={{ marginBottom: "1.1rem", lineHeight: 1.8, color: "#374151" }}>
          {renderInlineMath(text)}
        </p>
      );
    }
    paragraphLines = [];
  }

  function flushList() {
    if (listItems.length === 0) return;
    const Tag = listType === "ol" ? "ol" : "ul";
    elements.push(
      <Tag key={k()} style={{ paddingLeft: "1.6rem", marginBottom: "1.1rem", color: "#374151", lineHeight: 1.8 }}>
        {listItems.map((item, i) => (
          <li key={i} style={{ marginBottom: "0.3rem" }}>{item.node}</li>
        ))}
      </Tag>
    );
    listItems = [];
    listType = null;
  }

  function flushTable() {
    if (tableLines.length < 2) { tableLines = []; inTable = false; return; }
    elements.push(<div key={k()}>{parseTable(tableLines)}</div>);
    tableLines = [];
    inTable = false;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // ── Code blocks ──────────────────────────────────────────────────────────
    if (line.startsWith("```")) {
      if (inCode) {
        elements.push(
          <pre key={k()} style={{
            background: "#1e2030", color: "#cdd6f4",
            borderRadius: "0.75rem", padding: "1rem 1.25rem",
            overflowX: "auto", fontSize: "0.82rem",
            fontFamily: "ui-monospace, monospace",
            margin: "1rem 0",
          }}>
            <code>{codeLines.join("\n")}</code>
          </pre>
        );
        codeLines = [];
        codeLang = "";
        inCode = false;
      } else {
        flushParagraph(); flushList(); flushTable();
        codeLang = line.slice(3).trim();
        inCode = true;
      }
      continue;
    }
    if (inCode) { codeLines.push(line); continue; }

    // ── Block formula: $$ on its own line ────────────────────────────────────
    if (line.trim() === "$$") {
      if (inFormula) {
        elements.push(
          <FormulaBlock key={k()} formula={formulaLines.join("\n")} display />
        );
        formulaLines = [];
        inFormula = false;
      } else {
        flushParagraph(); flushList(); flushTable();
        inFormula = true;
      }
      continue;
    }
    if (inFormula) { formulaLines.push(line); continue; }

    // Single-line block formula: $$formula$$
    if (line.startsWith("$$") && line.endsWith("$$") && line.length > 4) {
      flushParagraph(); flushList(); flushTable();
      elements.push(<FormulaBlock key={k()} formula={line.slice(2, -2)} display />);
      continue;
    }

    // ── Tables ───────────────────────────────────────────────────────────────
    if (line.startsWith("|")) {
      if (!inTable) { flushParagraph(); flushList(); inTable = true; }
      tableLines.push(line);
      continue;
    } else if (inTable) {
      flushTable();
    }

    // ── Headings ─────────────────────────────────────────────────────────────
    if (line.startsWith("# ")) {
      flushParagraph(); flushList();
      if (skipFirstH1 && !firstH1Skipped) {
        firstH1Skipped = true;
        continue;
      }
      elements.push(
        <h1 key={k()} style={{ fontSize: "1.7rem", fontWeight: 700, margin: "2.5rem 0 0.75rem", color: "#111827", lineHeight: 1.3 }}>
          {renderInlineMath(line.slice(2))}
        </h1>
      );
      continue;
    }
    if (line.startsWith("## ")) {
      flushParagraph(); flushList();
      elements.push(
        <h2 key={k()} style={{ fontSize: "1.25rem", fontWeight: 700, margin: "2.25rem 0 0.6rem", color: "#1f2937", paddingBottom: "0.4rem", borderBottom: "2px solid #f3f4f6" }}>
          {renderInlineMath(line.slice(3))}
        </h2>
      );
      continue;
    }
    if (line.startsWith("### ")) {
      flushParagraph(); flushList();
      elements.push(
        <h3 key={k()} style={{ fontSize: "1.05rem", fontWeight: 600, margin: "1.75rem 0 0.4rem", color: "#374151" }}>
          {renderInlineMath(line.slice(4))}
        </h3>
      );
      continue;
    }

    // ── Lists ─────────────────────────────────────────────────────────────────
    if (line.match(/^- /) || line.match(/^\* /)) {
      flushParagraph();
      if (listType !== "ul") { flushList(); listType = "ul"; }
      listItems.push({ node: <>{renderInlineMath(line.slice(2))}</> });
      continue;
    }
    if (line.match(/^\d+\.\s/)) {
      flushParagraph();
      if (listType !== "ol") { flushList(); listType = "ol"; }
      listItems.push({ node: <>{renderInlineMath(line.replace(/^\d+\.\s/, ""))}</> });
      continue;
    }

    // ── Blockquote ────────────────────────────────────────────────────────────
    if (line.startsWith("> ")) {
      flushParagraph(); flushList();
      elements.push(
        <blockquote key={k()} style={{
          borderLeft: "3px solid #4361ee", paddingLeft: "1rem",
          margin: "1.25rem 0", color: "#4b5563",
          background: "#f5f7ff", borderRadius: "0 0.5rem 0.5rem 0",
          padding: "0.6rem 1rem",
        }}>
          {renderInlineMath(line.slice(2))}
        </blockquote>
      );
      continue;
    }

    // ── Horizontal rule ───────────────────────────────────────────────────────
    if (line.trim() === "---") {
      flushParagraph(); flushList();
      elements.push(<hr key={k()} style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "1.5rem 0" }} />);
      continue;
    }

    // ── Blank line → flush paragraph ──────────────────────────────────────────
    if (line.trim() === "") {
      flushParagraph(); flushList();
      continue;
    }

    // ── Regular text ─────────────────────────────────────────────────────────
    paragraphLines.push(line);
  }

  // Flush any remaining state
  flushParagraph();
  flushList();
  if (inTable) flushTable();
  if (inCode) {
    elements.push(
      <pre key={k()} style={{ background: "#f3f4f6", borderRadius: "0.5rem", padding: "1rem", overflowX: "auto", fontSize: "0.82rem" }}>
        <code>{codeLines.join("\n")}</code>
      </pre>
    );
  }
  if (inFormula && formulaLines.length > 0) {
    elements.push(<FormulaBlock key={k()} formula={formulaLines.join("\n")} display />);
  }

  return <div>{elements}</div>;
}

export default function MDXContent({ content, skipFirstH1 = false }: MDXContentProps) {
  return renderContent(content, skipFirstH1);
}
