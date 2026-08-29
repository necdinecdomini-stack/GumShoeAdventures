import { createContext, useContext } from "react";
import type { CaseNote } from "./types";

export const HighlightsContext = createContext<CaseNote[]>([]);

export function HighlightedText({ id, children }: { id: string; children: string }) {
  const notes = useContext(HighlightsContext);
  const highlights = notes
    .filter((note) => note.kind === "clip" && note.sourceBlock === id && typeof note.start === "number" && typeof note.end === "number")
    .sort((a, b) => (a.start ?? 0) - (b.start ?? 0));

  if (!highlights.length) return children;

  const pieces: React.ReactNode[] = [];
  let cursor = 0;
  highlights.forEach((highlight) => {
    const start = Math.max(cursor, Math.min(children.length, highlight.start ?? 0));
    const end = Math.max(start, Math.min(children.length, highlight.end ?? start));
    if (start > cursor) pieces.push(children.slice(cursor, start));
    if (end > start) pieces.push(<mark key={highlight.id} className={`evidence-highlight ${highlight.color}`}>{children.slice(start, end)}</mark>);
    cursor = Math.max(cursor, end);
  });
  if (cursor < children.length) pieces.push(children.slice(cursor));
  return <>{pieces}</>;
}

export function EvidenceParagraph({ id, children, className }: { id: string; children: string; className?: string }) {
  return <p className={className} data-evidence-id={id}><HighlightedText id={id}>{children}</HighlightedText></p>;
}
