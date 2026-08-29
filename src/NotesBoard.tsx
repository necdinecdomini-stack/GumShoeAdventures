import { useRef, useState } from "react";
import { NotepadIcon } from "./Icons";
import type { CaseNote, NoteColor } from "./types";

const noteColors: NoteColor[] = ["amber", "blue", "green", "rose"];

export default function NotesBoard({
  notes,
  german,
  onAdd,
  onUpdate,
  onDelete,
  onOpenSource,
  onClose,
}: {
  notes: CaseNote[];
  german: boolean;
  onAdd: () => void;
  onUpdate: (id: string, changes: Partial<CaseNote>) => void;
  onDelete: (id: string) => void;
  onOpenSource: (note: CaseNote) => void;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const [linkPicker, setLinkPicker] = useState<{ noteId: string; mode: "link" | "disprove" } | null>(null);

  const snippet = (note: CaseNote) => (note.text || "Untitled").slice(0, 40) + (note.text.length > 40 ? "…" : "");

  const addLink = (fromId: string, toId: string) => {
    const note = notes.find((n) => n.id === fromId);
    if (!note) return;
    const existing = note.linkedTo ?? [];
    if (!existing.includes(toId)) onUpdate(fromId, { linkedTo: [...existing, toId] });
    const target = notes.find((n) => n.id === toId);
    if (target) {
      const targetLinks = target.linkedTo ?? [];
      if (!targetLinks.includes(fromId)) onUpdate(toId, { linkedTo: [...targetLinks, fromId] });
    }
    setLinkPicker(null);
  };

  const markDisproved = (noteId: string, byId: string) => {
    onUpdate(noteId, { disprovedBy: byId });
    setLinkPicker(null);
  };

  const clearDisproved = (noteId: string) => {
    onUpdate(noteId, { disprovedBy: undefined });
  };

  const removeLink = (fromId: string, toId: string) => {
    const note = notes.find((n) => n.id === fromId);
    if (note) onUpdate(fromId, { linkedTo: (note.linkedTo ?? []).filter((id) => id !== toId) });
    const target = notes.find((n) => n.id === toId);
    if (target) onUpdate(toId, { linkedTo: (target.linkedTo ?? []).filter((id) => id !== fromId) });
  };

  const beginDrag = (event: React.PointerEvent<HTMLElement>, note: CaseNote) => {
    if (window.innerWidth <= 700) return;
    const card = event.currentTarget.closest(".note-card") as HTMLElement | null;
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    event.currentTarget.setPointerCapture(event.pointerId);
    setDrag({ id: note.id, offsetX: event.clientX - bounds.left, offsetY: event.clientY - bounds.top });
  };

  const moveDrag = (event: React.PointerEvent<HTMLElement>) => {
    if (!drag || !canvasRef.current) return;
    const bounds = canvasRef.current.getBoundingClientRect();
    const x = Math.max(1, Math.min(80, ((event.clientX - bounds.left - drag.offsetX) / bounds.width) * 100));
    const y = Math.max(2, Math.min(78, ((event.clientY - bounds.top - drag.offsetY) / bounds.height) * 100));
    onUpdate(drag.id, { x, y });
  };

  return (
    <section className="notes-board" role="dialog" aria-modal="true" aria-labelledby="notes-title">
      <header className="notes-board-bar">
        <div><NotepadIcon /><span><b id="notes-title">{german ? "BONES' NOTIZEN" : "BONES' NOTES"}</b><small>{notes.length} {german ? "NOTIZEN · AUF DIESEM GERÄT GESPEICHERT" : `${notes.length === 1 ? "NOTE" : "NOTES"} · SAVED ON THIS DEVICE`}</small></span></div>
        <div><button className="add-note-button" onClick={onAdd}>+ {german ? "NEUE NOTIZ" : "NEW DETECTIVE NOTE"}</button><button className="close-notes-button" onClick={onClose} aria-label="Close notes">×</button></div>
      </header>
      <div className="notes-canvas" ref={canvasRef} onPointerMove={moveDrag} onPointerUp={() => setDrag(null)} onPointerCancel={() => setDrag(null)}>
        <div className="board-grid" aria-hidden="true" />
        {notes.length > 0 && (() => {
          const links: { x1: number; y1: number; x2: number; y2: number; disproved: boolean }[] = [];
          const seen = new Set<string>();
          notes.forEach((note) => {
            (note.linkedTo ?? []).forEach((targetId) => {
              const pair = [note.id, targetId].sort().join("|");
              if (seen.has(pair)) return;
              seen.add(pair);
              const target = notes.find((n) => n.id === targetId);
              if (!target) return;
              links.push({ x1: note.x + 5, y1: note.y + 3, x2: target.x + 5, y2: target.y + 3, disproved: false });
            });
            if (note.disprovedBy) {
              const by = notes.find((n) => n.id === note.disprovedBy);
              if (by) {
                const pair = [note.id, note.disprovedBy].sort().join("|d");
                if (!seen.has(pair)) {
                  seen.add(pair);
                  links.push({ x1: note.x + 5, y1: note.y + 3, x2: by.x + 5, y2: by.y + 3, disproved: true });
                }
              }
            }
          });
          return links.length > 0 ? (
            <svg className="note-links-svg" aria-hidden="true">
              {links.map((link, i) => (
                <line key={i} x1={`${link.x1}%`} y1={`${link.y1}%`} x2={`${link.x2}%`} y2={`${link.y2}%`} className={link.disproved ? "link-line disproved" : "link-line"} />
              ))}
            </svg>
          ) : null;
        })()}
        {!notes.length && (
          <div className="empty-notes"><NotepadIcon /><h2>{german ? "Noch keine Hinweise notiert." : "No clues pinned yet."}</h2><p>{german ? "Markiere eine Passage und wähle ‘Zu Notizen’, oder erstelle eine leere Ermittlungsnotiz." : <>Highlight a passage in a case file and choose <b>Flag to Notes</b>, or create a blank detective note.</>}</p><button onClick={onAdd}>{german ? "ERSTE NOTIZ ERSTELLEN" : "CREATE FIRST NOTE"}</button></div>
        )}
        {notes.map((note, index) => (
          <article
            className={`note-card ${note.kind} ${note.color} ${drag?.id === note.id ? "dragging" : ""}${note.disprovedBy ? " disproved" : ""}`}
            key={note.id}
            style={{ left: `${note.x}%`, top: `${note.y}%`, zIndex: drag?.id === note.id ? 8 : 2 + index }}
          >
            {note.disprovedBy && (
              <div className="disproved-badge">
                <span>{german ? "WIDERLEGT" : "DISPROVED"}</span>
                <button onClick={() => clearDisproved(note.id)} aria-label="Remove disproved status">×</button>
              </div>
            )}
            <header className="note-drag-handle" onPointerDown={(event) => beginDrag(event, note)}>
              <span>{note.kind === "clip" ? (german ? "MARKIERTER HINWEIS" : "FLAGGED EVIDENCE") : (german ? "ERMITTLUNGSNOTIZ" : "DETECTIVE NOTE")}</span>
              {(note.linkedTo?.length ?? 0) > 0 && <span className="link-count">{"🔗"} {note.linkedTo!.length}</span>}
              <i aria-hidden="true">{"⠇"}</i>
            </header>
            <div className="note-body">
              <div className="note-origin">
                <span>SOURCE / QUELLE</span>
                {note.kind === "clip" ? (
                  <button className="note-source" onClick={() => onOpenSource(note)}>↗ {note.caseId === "magyarosaurus" ? "SID-2026-0002" : "NPD-2026-1187"} · {note.sourceTitle ?? "Case file / Fallakte"}</button>
                ) : (
                  <b>{note.caseId === "magyarosaurus" ? "SID-2026-0002" : "NPD-2026-1187"} · {german ? "Eigene Notiz" : "Student-created note"}</b>
                )}
              </div>
              {note.kind === "clip" ? (
                <>
                  <blockquote>&quot;{note.text}&quot;</blockquote>
                  <label><span>{german ? "WARUM IST DAS WICHTIG?" : "WHY DOES THIS MATTER?"}</span><textarea value={note.comment} onChange={(event) => onUpdate(note.id, { comment: event.target.value })} placeholder={german ? "Schreibe deine Begründung…" : "Add your reasoning…"} rows={3} /></label>
                </>
              ) : (
                <label className="blank-note-field"><span>{german ? "DEINE NOTIZ" : "YOUR NOTE"}</span><textarea autoFocus={!note.text} value={note.text} onChange={(event) => onUpdate(note.id, { text: event.target.value })} placeholder={german ? "Schreibe eine Theorie, Frage oder Zeitangabe…" : "Type a theory, question, timeline detail…"} rows={7} /></label>
              )}
              {(note.linkedTo?.length ?? 0) > 0 && (
                <div className="note-links-list">
                  <span>{german ? "VERKNÜPFT MIT" : "LINKED TO"}</span>
                  {note.linkedTo!.map((lid) => {
                    const linked = notes.find((n) => n.id === lid);
                    if (!linked) return null;
                    return <div key={lid} className="note-link-row"><span>{snippet(linked)}</span><button onClick={() => removeLink(note.id, lid)} aria-label="Remove link">×</button></div>;
                  })}
                </div>
              )}
              {note.disprovedBy && (() => {
                const by = notes.find((n) => n.id === note.disprovedBy);
                return by ? <div className="note-links-list disproved-by"><span>{german ? "WIDERLEGT DURCH" : "DISPROVED BY"}</span><div className="note-link-row"><span>{snippet(by)}</span></div></div> : null;
              })()}
              <footer>
                <div className="note-colors" aria-label="Note colour">
                  {noteColors.map((color) => <button key={color} className={color === note.color ? `${color} selected` : color} onClick={() => onUpdate(note.id, { color })} aria-label={`Use ${color} note`} />)}
                </div>
                <div className="note-actions">
                  <button className="note-action-btn" onClick={() => setLinkPicker({ noteId: note.id, mode: "link" })}>{"🔗"} {german ? "VERKNÜPFEN" : "LINK"}</button>
                  {!note.disprovedBy && <button className="note-action-btn disprove-btn" onClick={() => setLinkPicker({ noteId: note.id, mode: "disprove" })}>✕ {german ? "WIDERLEGEN" : "DISPROVE"}</button>}
                  <button className="delete-note" onClick={() => onDelete(note.id)}>{german ? "LÖSCHEN" : "DELETE"}</button>
                </div>
              </footer>
              {linkPicker?.noteId === note.id && (
                <div className="link-picker">
                  <div className="link-picker-header">
                    <span>{linkPicker.mode === "link" ? (german ? "Verknüpfen mit…" : "Link to…") : (german ? "Widerlegt durch…" : "Disproved by…")}</span>
                    <button onClick={() => setLinkPicker(null)}>×</button>
                  </div>
                  <div className="link-picker-list">
                    {notes.filter((n) => n.id !== note.id && !(linkPicker.mode === "link" && (note.linkedTo ?? []).includes(n.id))).map((n) => (
                      <button key={n.id} onClick={() => linkPicker.mode === "link" ? addLink(note.id, n.id) : markDisproved(note.id, n.id)}>
                        <span className={`link-picker-dot ${n.color}`} />{snippet(n)}
                      </button>
                    ))}
                    {notes.filter((n) => n.id !== note.id && !(linkPicker.mode === "link" && (note.linkedTo ?? []).includes(n.id))).length === 0 && (
                      <span className="link-picker-empty">{german ? "Keine anderen Notizen" : "No other notes"}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
