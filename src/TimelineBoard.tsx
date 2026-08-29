import { TimelineIcon } from "./Icons";
import type { TimelineEvent } from "./types";

export default function TimelineBoard({
  events,
  german,
  onAdd,
  onUpdate,
  onDelete,
  onMove,
  onOpenSource,
  onClose,
}: {
  events: TimelineEvent[];
  german: boolean;
  onAdd: () => void;
  onUpdate: (id: string, changes: Partial<TimelineEvent>) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: -1 | 1) => void;
  onOpenSource: (event: TimelineEvent) => void;
  onClose: () => void;
}) {
  return (
    <section className="timeline-board" role="dialog" aria-modal="true" aria-labelledby="timeline-title">
      <header className="notes-board-bar timeline-board-bar">
        <div><TimelineIcon /><span><b id="timeline-title">{german ? "FALL-ZEITLEISTE" : "CASE TIMELINE"}</b><small>{events.length} {german ? "EREIGNISSE · AUF DIESEM GERÄT GESPEICHERT" : "EVENTS · SAVED ON THIS DEVICE"}</small></span></div>
        <div><button className="add-note-button" onClick={onAdd}>+ {german ? "NEUES EREIGNIS" : "NEW EVENT"}</button><button className="close-notes-button" onClick={onClose} aria-label="Close timeline">×</button></div>
      </header>
      <div className="timeline-canvas">
        {!events.length ? (
          <div className="empty-notes"><TimelineIcon /><h2>{german ? "Die Zeitleiste ist noch leer." : "The timeline is empty."}</h2><p>{german ? "Markiere eine Zeitangabe oder ein Ereignis in einem Bericht und wähle ‘Zur Zeitleiste’. Du kannst auch ein eigenes Ereignis erstellen." : "Highlight a time or event in a case file and choose 'Add to Timeline.' You can also create your own event."}</p><button onClick={onAdd}>{german ? "ERSTES EREIGNIS ERSTELLEN" : "CREATE FIRST EVENT"}</button></div>
        ) : (
          <ol className="timeline-list">
            {events.map((event, index) => (
              <li key={event.id}>
                <div className="timeline-number">{index + 1}</div>
                <article className="timeline-card">
                  <header><input value={event.time} onChange={(change) => onUpdate(event.id, { time: change.target.value })} placeholder={german ? "Zeit oder Datum" : "Time or date"} aria-label={german ? "Zeit oder Datum" : "Time or date"} /><div><button disabled={index === 0} onClick={() => onMove(event.id, -1)} aria-label="Move earlier">↑</button><button disabled={index === events.length - 1} onClick={() => onMove(event.id, 1)} aria-label="Move later">↓</button></div></header>
                  <textarea className="timeline-event-text" value={event.text} onChange={(change) => onUpdate(event.id, { text: change.target.value })} placeholder={german ? "Was ist passiert?" : "What happened?"} rows={3} />
                  {event.sourceTab && <button className="note-source" onClick={() => onOpenSource(event)}>↗ {event.sourceTitle}</button>}
                  <textarea className="timeline-comment" value={event.comment} onChange={(change) => onUpdate(event.id, { comment: change.target.value })} placeholder={german ? "Warum ist dieses Ereignis wichtig?" : "Why does this event matter?"} rows={2} />
                  <footer><span>{german ? "MIT ↑ UND ↓ SORTIEREN" : "ORDER WITH ↑ AND ↓"}</span><button onClick={() => onDelete(event.id)}>{german ? "LÖSCHEN" : "DELETE"}</button></footer>
                </article>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
