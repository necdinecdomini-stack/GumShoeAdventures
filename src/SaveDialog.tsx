import { SaveIcon } from "./Icons";
import type { SaveSlot } from "./types";

const MAX_SLOTS = 3;

export function loadAllSaves(): (SaveSlot | null)[] {
  try {
    const raw = window.localStorage.getItem("special-investigations-saves");
    if (raw) {
      const parsed = JSON.parse(raw) as (SaveSlot | null)[];
      while (parsed.length < MAX_SLOTS) parsed.push(null);
      return parsed.slice(0, MAX_SLOTS);
    }
  } catch {}
  return Array.from({ length: MAX_SLOTS }, () => null);
}

export function persistSaves(slots: (SaveSlot | null)[]) {
  try { window.localStorage.setItem("special-investigations-saves", JSON.stringify(slots)); } catch {}
}

export default function SaveDialog({
  slots,
  onSave,
  onLoad,
  onDelete,
  onExport,
  onImport,
  onClose,
  confirmOverwrite,
  confirmLoad,
  confirmDelete,
  setConfirmOverwrite,
  setConfirmLoad,
  setConfirmDelete,
}: {
  slots: (SaveSlot | null)[];
  onSave: (index: number) => void;
  onLoad: (index: number) => void;
  onDelete: (index: number) => void;
  onExport: () => void;
  onImport: () => void;
  onClose: () => void;
  confirmOverwrite: number | null;
  confirmLoad: number | null;
  confirmDelete: number | null;
  setConfirmOverwrite: (index: number | null) => void;
  setConfirmLoad: (index: number | null) => void;
  setConfirmDelete: (index: number | null) => void;
}) {
  return (
    <section className="save-window" role="dialog" aria-modal="true" aria-label="Save / Load Game">
      <header className="window-titlebar"><span><SaveIcon />SAVE / LOAD</span><button onClick={onClose} aria-label="Close save window">×</button></header>
      <div className="window-toolbar"><span>GAME PROGRESS</span><span>{MAX_SLOTS} SLOTS</span></div>
      <div className="save-slot-list">
        {slots.map((slot, i) => (
          <div key={i} className={`save-slot${slot ? " occupied" : ""}`}>
            <div className="save-slot-info">
              <strong>{slot ? slot.name : `Slot ${i + 1} — empty`}</strong>
              {slot && <small>{new Date(slot.savedAt).toLocaleString()} · {(slot.difficulty ?? "officer").replace("-", " ")} · {slot.notes.length} notes · {slot.timeline.length} events</small>}
            </div>
            <div className="save-slot-actions">
              {confirmOverwrite === i ? (
                <span className="save-confirm">Overwrite? <button onClick={() => onSave(i)}>Yes</button><button onClick={() => setConfirmOverwrite(null)}>No</button></span>
              ) : confirmLoad === i ? (
                <span className="save-confirm">Load this save? <button onClick={() => onLoad(i)}>Yes</button><button onClick={() => setConfirmLoad(null)}>No</button></span>
              ) : confirmDelete === i ? (
                <span className="save-confirm">Delete? <button onClick={() => onDelete(i)}>Yes</button><button onClick={() => setConfirmDelete(null)}>No</button></span>
              ) : (
                <>
                  <button className="save-btn" onClick={() => { if (slot) { setConfirmOverwrite(i); } else { onSave(i); } }}>SAVE</button>
                  {slot && <button className="load-btn" onClick={() => setConfirmLoad(i)}>LOAD</button>}
                  {slot && <button className="delete-btn" onClick={() => setConfirmDelete(i)}>×</button>}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="save-file-actions">
        <button onClick={onExport}>EXPORT TO FILE</button>
        <button onClick={onImport}>IMPORT FROM FILE</button>
      </div>
    </section>
  );
}
