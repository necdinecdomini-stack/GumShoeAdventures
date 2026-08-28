import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { timmyQuestions, timmyReports } from "./timmy-data";
import { CaseReportApp, ReportIcon, createEmptyReport } from "./case-report";
import type { CaseReportData, ReportCaseId, ReportSource } from "./case-report";
import ComicIntro from "./ComicIntro";
import CityMap from "./CityMap";
import type { LocationId } from "./CityMap";
import { toggleMute, isMuted, sfxClick, sfxOpen, sfxClose } from "./lib/audio";
import "./intro.css";

type CaseId = ReportCaseId;
type TabKey = "timmy_police" | "timmy_fire" | "timmy_insurance" | "timmy_sal" | "timmy_bianchi" | "timmy_agnes" | "timmy_tony" | "timmy_task";
type Verdict = "" | "accident" | "sal" | "timmy" | "mafia";
type NoteColor = "amber" | "blue" | "green" | "rose";

type CaseNote = {
  id: string;
  kind: "clip" | "blank";
  text: string;
  comment: string;
  color: NoteColor;
  x: number;
  y: number;
  caseId?: CaseId;
  sourceTab?: TabKey;
  sourceTitle?: string;
  sourceBlock?: string;
  start?: number;
  end?: number;
};

type TimelineEvent = {
  id: string;
  caseId: CaseId;
  text: string;
  time: string;
  comment: string;
  sourceTab?: TabKey;
  sourceTitle?: string;
  sourceBlock?: string;
};

type SelectionDraft = {
  text: string;
  tab: TabKey;
  block: string;
  start: number;
  end: number;
  x: number;
  y: number;
};

const timmyTabs: { key: TabKey; label: string; code: string }[] = [
  ...timmyReports.map((report) => ({ key: report.key as TabKey, label: report.label, code: report.code })),
  { key: "timmy_task", label: "Ermittlungsauftrag", code: "08" },
];

const tabs = [...timmyTabs];

const HighlightsContext = createContext<CaseNote[]>([]);
const noteColors: NoteColor[] = ["amber", "blue", "green", "rose"];

function HighlightedText({ id, children }: { id: string; children: string }) {
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

function EvidenceParagraph({ id, children, className }: { id: string; children: string; className?: string }) {
  return <p className={className} data-evidence-id={id}><HighlightedText id={id}>{children}</HighlightedText></p>;
}

function FolderIcon({ small = false }: { small?: boolean }) {
  return (
    <span className={small ? "folder-icon folder-icon-small" : "folder-icon"} aria-hidden="true">
      <span />
    </span>
  );
}


function TimmyReportTab({ reportKey }: { reportKey: TabKey }) {
  const report = timmyReports.find((item) => item.key === reportKey);
  if (!report) return null;
  return (
    <article className="document-page german-document">
      <header className="document-heading">
        <p>{report.agency}</p>
        <h2>{report.title}</h2>
        <div className="report-meta">{report.meta.map((line) => <span key={line}>{line}</span>)}</div>
      </header>
      <section className="reading-copy report-copy">
        {report.sections.map((section, sectionIndex) => (
          <div className="report-section" key={`${report.key}-${sectionIndex}`}>
            {section.heading && <h3>{section.heading}</h3>}
            {section.paragraphs?.map((paragraph, paragraphIndex) => <EvidenceParagraph id={`${report.key}-p-${sectionIndex}-${paragraphIndex}`} key={paragraph}>{paragraph}</EvidenceParagraph>)}
            {section.bullets && <ul>{section.bullets.map((bullet, bulletIndex) => <li key={bullet}><EvidenceParagraph id={`${report.key}-b-${sectionIndex}-${bulletIndex}`}>{bullet}</EvidenceParagraph></li>)}</ul>}
            {section.exchanges && (
              <div className="transcript-section">
                {section.exchanges.map((exchange, exchangeIndex) => (
                  <div className="testimony-block" key={`${report.key}-x-${sectionIndex}-${exchangeIndex}`}>
                    <strong>{exchange.speaker}</strong>
                    <EvidenceParagraph id={`${report.key}-x-${sectionIndex}-${exchangeIndex}`}>{exchange.text}</EvidenceParagraph>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
      <footer className="page-stamp">{report.stamp}</footer>
    </article>
  );
}

function TimmyTaskTab({ onSubmit }: { onSubmit: () => void }) {
  return (
    <article className="document-page german-document">
      <header className="document-heading">
        <p>Sonderermittlungen · Ausbildungsauftrag</p>
        <h2>Der Brand in Timmy Two-Shoes&apos; Restaurant</h2>
        <span>7 Berichte · 4 mögliche Antworten · 1 Urteil</span>
      </header>
      <EvidenceParagraph id="timmy-task-intro" className="task-note">Lies alle sieben Berichte. Ordne die Ereignisse auf der Zeitleiste und vergleiche die Aussagen. Entscheide dann, wer das Restaurant wahrscheinlich angezündet hat. Eine verdächtige Person ist nicht automatisch der Täter.</EvidenceParagraph>
      <div className="suspect-strip"><span>NIEMAND — UNFALL</span><span>SAL MONTENEGRO</span><span>TIMMY BIANCHI</span><span>DIE MAFIA</span></div>
      <ol className="task-list">{timmyQuestions.map((question, index) => <li key={question}><span>{String(index + 1).padStart(2, "0")}</span><EvidenceParagraph id={`timmy-question-${index}`}>{question}</EvidenceParagraph></li>)}</ol>
      <div className="task-submit-panel">
        <div><span>LETZTER SCHRITT</span><strong>Bereit, den Fall abzuschließen?</strong><p>Gib dein Urteil ab und erkläre, welche Hinweise es stützen.</p></div>
        <button onClick={onSubmit}>FALL EINREICHEN →</button>
      </div>
      <footer className="page-stamp">TIMMY TWO-SHOES / AUFTRAG 07</footer>
    </article>
  );
}


function SubmitCaseModal({
  caseId,
  verdict,
  reasoning,
  submitted,
  reviewed,
  total,
  onVerdict,
  onReasoning,
  onClose,
  onSubmit,
  onEdit,
}: {
  caseId: CaseId;
  verdict: Verdict;
  reasoning: string;
  submitted: boolean;
  reviewed: number;
  total: number;
  onVerdict: (value: Verdict) => void;
  onReasoning: (value: string) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onEdit: () => void;
}) {
  const wordCount = reasoning.trim() ? reasoning.trim().split(/\s+/).length : 0;
  const german = caseId === "timmy-two-shoes";
  const verdictOptions: [Exclude<Verdict, "">, string][] = [
    ["accident", "Niemand — es war ein Unfall"],
    ["sal", "Sal Montenegro"],
    ["timmy", "Timmy Bianchi"],
    ["mafia", "Die Mafia"],
  ];

  const downloadSubmission = () => {
    const verdictLabel = verdictOptions.find(([value]) => value === verdict)?.[1] ?? (german ? "Nicht angegeben" : "Not supplied");
    const text = german
      ? `SONDERERMITTLUNGEN — TIMMY TWO-SHOES\n\nUrteil: ${verdictLabel}\n\nBegründung:\n${reasoning}\n`
      : `SPECIAL INVESTIGATIONS — CASE 81-F\n\nConclusion: ${verdictLabel}\n\nReasoning:\n${reasoning}\n`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = german ? "timmy-two-shoes-urteil.txt" : "case-81-f-submission.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="submit-overlay" role="dialog" aria-modal="true" aria-labelledby="submit-title">
      <section className="submit-window">
        <header><span>{german ? "TIMMY TWO-SHOES · ABSCHLUSSBERICHT" : "CASE 81-F · FINAL REPORT"}</span><button onClick={onClose} aria-label="Close submission form">×</button></header>
        {submitted ? (
          <div className="submission-receipt">
            <div className="submitted-stamp">{german ? "FALL EINGEREICHT" : "CASE SUBMITTED"}</div>
            <h2 id="submit-title">{german ? "Dein Urteil wurde gespeichert." : "Your conclusion has been recorded."}</h2>
            <p>{german ? "Der Bericht ist auf diesem Gerät gespeichert. Du kannst eine Kopie für deine Lehrkraft herunterladen oder deine Antwort bearbeiten." : "The report is saved on this device. You can download a copy for your teacher or return to edit your answer."}</p>
            <div className="receipt-actions"><button className="secondary-action" onClick={onEdit}>{german ? "BERICHT BEARBEITEN" : "EDIT REPORT"}</button><button className="primary-action" onClick={downloadSubmission}>{german ? "BERICHT HERUNTERLADEN" : "DOWNLOAD REPORT"}</button></div>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <div className="submit-heading"><p>{german ? "URTEIL DER ERMITTLUNG" : "INVESTIGATOR'S CONCLUSION"}</p><h2 id="submit-title">{german ? "Fall einreichen" : "Submit Case"}</h2><span>{german ? `${reviewed} von ${total} Dokumenten gelesen` : `${reviewed} of ${total} documents reviewed`}</span></div>
            <fieldset>
              <legend>{german ? "Was ist dein Urteil?" : "What is your conclusion?"}</legend>
              {verdictOptions.map(([value, label]) => (
                <label key={value} className={verdict === value ? "selected" : ""}><input type="radio" name="verdict" value={value} checked={verdict === value} onChange={() => onVerdict(value)} required /><span>{label}</span></label>
              ))}
            </fieldset>
            <label className="reasoning-field"><span>{german ? "Erkläre deine Antwort. Benutze konkrete Hinweise aus den Berichten." : "Explain your answer. Use specific evidence from the case files."}</span><textarea value={reasoning} onChange={(event) => onReasoning(event.target.value)} rows={8} minLength={80} required placeholder={german ? "Ich glaube, dass… Der stärkste Hinweis ist… Allerdings…" : "I conclude that… The strongest evidence is… However…"} /><small>{wordCount} {german ? "Wörter · Ziel: 120–180 Wörter" : "words · aim for 120–180 words"}</small></label>
            <div className="form-actions"><button type="button" className="secondary-action" onClick={onClose}>{german ? "ZURÜCK ZU DEN AKTEN" : "RETURN TO FILES"}</button><button type="submit" className="primary-action">{german ? "URTEIL SPEICHERN" : "FILE CONCLUSION"}</button></div>
          </form>
        )}
      </section>
    </div>
  );
}

function NotepadIcon() {
  return <span className="notepad-icon" aria-hidden="true"><i /><i /><i /><i /></span>;
}

function TimelineIcon() {
  return <span className="timeline-icon" aria-hidden="true"><i /><i /><i /></span>;
}

function TimelineBoard({
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
        <div><button className="add-note-button" onClick={onAdd}>＋ {german ? "NEUES EREIGNIS" : "NEW EVENT"}</button><button className="close-notes-button" onClick={onClose} aria-label="Close timeline">×</button></div>
      </header>
      <div className="timeline-canvas">
        {!events.length ? (
          <div className="empty-notes"><TimelineIcon /><h2>{german ? "Die Zeitleiste ist noch leer." : "The timeline is empty."}</h2><p>{german ? "Markiere eine Zeitangabe oder ein Ereignis in einem Bericht und wähle ‚Zur Zeitleiste‘. Du kannst auch ein eigenes Ereignis erstellen." : "Highlight a time or event in a case file and choose ‘Add to Timeline.’ You can also create your own event."}</p><button onClick={onAdd}>{german ? "ERSTES EREIGNIS ERSTELLEN" : "CREATE FIRST EVENT"}</button></div>
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

function NotesBoard({
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
        <div><button className="add-note-button" onClick={onAdd}>＋ {german ? "NEUE NOTIZ" : "NEW DETECTIVE NOTE"}</button><button className="close-notes-button" onClick={onClose} aria-label="Close notes">×</button></div>
      </header>
      <div className="notes-canvas" ref={canvasRef} onPointerMove={moveDrag} onPointerUp={() => setDrag(null)} onPointerCancel={() => setDrag(null)}>
        <div className="board-grid" aria-hidden="true" />
        {!notes.length && (
          <div className="empty-notes"><NotepadIcon /><h2>{german ? "Noch keine Hinweise notiert." : "No clues pinned yet."}</h2><p>{german ? "Markiere eine Passage und wähle ‚Zu Notizen‘, oder erstelle eine leere Ermittlungsnotiz." : <>Highlight a passage in a case file and choose <b>Flag to Notes</b>, or create a blank detective note.</>}</p><button onClick={onAdd}>{german ? "ERSTE NOTIZ ERSTELLEN" : "CREATE FIRST NOTE"}</button></div>
        )}
        {notes.map((note, index) => (
          <article
            className={`note-card ${note.kind} ${note.color} ${drag?.id === note.id ? "dragging" : ""}`}
            key={note.id}
            style={{ left: `${note.x}%`, top: `${note.y}%`, zIndex: drag?.id === note.id ? 8 : 2 + index }}
          >
            <header className="note-drag-handle" onPointerDown={(event) => beginDrag(event, note)}>
              <span>{note.kind === "clip" ? (german ? "MARKIERTER HINWEIS" : "FLAGGED EVIDENCE") : (german ? "ERMITTLUNGSNOTIZ" : "DETECTIVE NOTE")}</span><i aria-hidden="true">⠿</i>
            </header>
            <div className="note-body">
              <div className="note-origin">
                <span>SOURCE / QUELLE</span>
                {note.kind === "clip" ? (
                  <button className="note-source" onClick={() => onOpenSource(note)}>↗ NPD-2026-1187 · {note.sourceTitle ?? "Case file / Fallakte"}</button>
                ) : (
                  <b>NPD-2026-1187 · Student-created note / Eigene Notiz</b>
                )}
              </div>
              {note.kind === "clip" ? (
                <>
                  <blockquote>“{note.text}”</blockquote>
                  <label><span>{german ? "WARUM IST DAS WICHTIG?" : "WHY DOES THIS MATTER?"}</span><textarea value={note.comment} onChange={(event) => onUpdate(note.id, { comment: event.target.value })} placeholder={german ? "Schreibe deine Begründung…" : "Add your reasoning…"} rows={3} /></label>
                </>
              ) : (
                <label className="blank-note-field"><span>{german ? "DEINE NOTIZ" : "YOUR NOTE"}</span><textarea autoFocus={!note.text} value={note.text} onChange={(event) => onUpdate(note.id, { text: event.target.value })} placeholder={german ? "Schreibe eine Theorie, Frage oder Zeitangabe…" : "Type a theory, question, timeline detail…"} rows={7} /></label>
              )}
              <footer>
                <div className="note-colors" aria-label="Note colour">
                  {noteColors.map((color) => <button key={color} className={color === note.color ? `${color} selected` : color} onClick={() => onUpdate(note.id, { color })} aria-label={`Use ${color} note`} />)}
                </div>
                <button className="delete-note" onClick={() => onDelete(note.id)}>{german ? "LÖSCHEN" : "DELETE"}</button>
              </footer>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [view, setView] = useState<"intro" | "map" | "terminal" | LocationId>("intro");
  const [muted, setMuted] = useState(isMuted());
  const [folderOpen, setFolderOpen] = useState(false);
  const [caseOpen, setCaseOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<CaseId>("timmy-two-shoes");
  const [activeTab, setActiveTab] = useState<TabKey>("timmy_police");
  const [visited, setVisited] = useState<Set<TabKey>>(new Set(["timmy_police"]));
  const [submitOpen, setSubmitOpen] = useState(false);
  const [reports, setReports] = useState<Record<CaseId, CaseReportData>>(() => ({
    "timmy-two-shoes": createEmptyReport(),
  }));
  const [reportsLoaded, setReportsLoaded] = useState(false);
  const [notes, setNotes] = useState<CaseNote[]>([]);
  const [notesLoaded, setNotesLoaded] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [selectionDraft, setSelectionDraft] = useState<SelectionDraft | null>(null);
  const [noteToast, setNoteToast] = useState("");
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [timelineLoaded, setTimelineLoaded] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("special-investigations-case-reports-v2");
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<Record<CaseId, CaseReportData>>;
        setReports({
          "timmy-two-shoes": parsed["timmy-two-shoes"] ?? createEmptyReport(),
        });
      }
    } catch {
      // A damaged local draft should never prevent a new report from being written.
    } finally {
      setReportsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!reportsLoaded) return;
    try {
      window.localStorage.setItem("special-investigations-case-reports-v2", JSON.stringify(reports));
    } catch {
      // The report remains usable for the current session if storage is unavailable.
    }
  }, [reports, reportsLoaded]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("case-81-f-notes-v1");
      if (saved) setNotes((JSON.parse(saved) as CaseNote[]).map((note) => ({ ...note, caseId: "timmy-two-shoes" as CaseId })));
    } catch {
      // Notes simply begin empty if local browser storage is unavailable.
    } finally {
      setNotesLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!notesLoaded) return;
    try {
      window.localStorage.setItem("case-81-f-notes-v1", JSON.stringify(notes));
    } catch {
      // Keep the board usable for the current session even without persistence.
    }
  }, [notes, notesLoaded]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("special-investigations-timeline-v1");
      if (saved) setTimeline(JSON.parse(saved) as TimelineEvent[]);
    } catch {
      // A damaged saved timeline should not block the terminal.
    } finally {
      setTimelineLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!timelineLoaded) return;
    try {
      window.localStorage.setItem("special-investigations-timeline-v1", JSON.stringify(timeline));
    } catch {
      // Keep the timeline usable for the current session.
    }
  }, [timeline, timelineLoaded]);

  useEffect(() => {
    if (!noteToast) return;
    const timer = window.setTimeout(() => setNoteToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [noteToast]);

  useEffect(() => {
    if (view === "intro") return;
    const handler = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest("button");
      if (btn && !btn.classList.contains("sound-toggle")) sfxClick();
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [view]);

  if (view === "intro") {
    return <ComicIntro onComplete={() => setView("terminal")} />;
  }

  if (view === "map") {
    return (
      <CityMap
        onNavigate={(id) => {
          if (id === "police-hq") {
            setView("terminal");
          } else {
            setView(id);
          }
        }}
      />
    );
  }

  if (view !== "terminal") {
    return (
      <div className="location-placeholder">
        <div className="location-placeholder-inner">
          <p className="location-eyebrow">INVESTIGATION IN PROGRESS</p>
          <h1>{view.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</h1>
          <p>This location is under investigation. Witnesses and evidence will be available soon.</p>
          <button className="back-to-map-btn" onClick={() => { sfxClick(); setView("map"); }}>← Back to City Map</button>
        </div>
      </div>
    );
  }

  const openTab = (key: TabKey) => {
    setActiveTab(key);
    setVisited((current) => new Set([...current, key]));
  };

  const currentTabs = timmyTabs;
  const currentVisited = currentTabs.filter((tab) => visited.has(tab.key)).length;
  const caseNotes = notes.filter((note) => (note.caseId ?? "timmy-two-shoes") === selectedCase);
  const caseTimeline = timeline.filter((event) => event.caseId === selectedCase);
  const currentReport = reports[selectedCase];
  const submitted = currentReport.submitted;
  const reportSources: ReportSource[] = [
    ...caseNotes.filter((note) => note.text.trim()).map((note) => ({
      id: `note-${note.id}`,
      kind: note.kind === "clip" ? "highlight" as const : "note" as const,
      title: note.sourceTitle ?? (note.kind === "clip" ? "Flagged evidence" : "Detective note"),
      text: note.text,
      comment: note.comment,
    })),
    ...caseTimeline.filter((event) => event.text.trim()).map((event, index) => ({
      id: `timeline-${event.id}`,
      kind: "timeline" as const,
      title: event.time.trim() || `Timeline event ${index + 1}`,
      text: event.time.trim() ? `${event.time.trim()} — ${event.text}` : event.text,
      comment: event.comment,
    })),
  ];
  const germanCase = selectedCase === "timmy-two-shoes";
  const activeTitle = tabs.find((tab) => tab.key === activeTab)?.label ?? "Case file";

  const openCase = (caseId: CaseId) => {
    setSelectedCase(caseId);
    setCaseOpen(true);
    setFolderOpen(false);
    setSubmitOpen(false);
    openTab("timmy_police");
  };

  const captureSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.rangeCount) {
      setSelectionDraft(null);
      return;
    }
    const range = selection.getRangeAt(0);
    const startElement = range.startContainer.nodeType === Node.ELEMENT_NODE ? range.startContainer as Element : range.startContainer.parentElement;
    const endElement = range.endContainer.nodeType === Node.ELEMENT_NODE ? range.endContainer as Element : range.endContainer.parentElement;
    const startBlock = startElement?.closest<HTMLElement>("[data-evidence-id]");
    const endBlock = endElement?.closest<HTMLElement>("[data-evidence-id]");
    if (!startBlock || startBlock !== endBlock) {
      setSelectionDraft(null);
      return;
    }

    const rawText = range.toString();
    const text = rawText.trim();
    if (text.length < 2) {
      setSelectionDraft(null);
      return;
    }
    const before = range.cloneRange();
    before.selectNodeContents(startBlock);
    before.setEnd(range.startContainer, range.startOffset);
    const leadingSpace = rawText.length - rawText.trimStart().length;
    const trailingSpace = rawText.length - rawText.trimEnd().length;
    const start = before.toString().length + leadingSpace;
    const end = start + rawText.length - leadingSpace - trailingSpace;
    const bounds = range.getBoundingClientRect();
    setSelectionDraft({
      text,
      tab: activeTab,
      block: startBlock.dataset.evidenceId ?? "",
      start,
      end,
      x: Math.max(12, Math.min(window.innerWidth - 360, bounds.left + bounds.width / 2 - 165)),
      y: Math.max(58, bounds.top - 48),
    });
  };

  const updateNote = (id: string, changes: Partial<CaseNote>) => {
    setNotes((current) => current.map((note) => note.id === id ? { ...note, ...changes } : note));
  };

  const nextNotePosition = () => ({
    x: 3 + (caseNotes.length % 3) * 29,
    y: 5 + (Math.floor(caseNotes.length / 3) % 3) * 30,
  });

  const addBlankNote = () => {
    const position = nextNotePosition();
    setNotes((current) => [...current, {
      id: window.crypto?.randomUUID?.() ?? `note-${Date.now()}`,
      kind: "blank",
      text: "",
      comment: "",
      color: noteColors[current.length % noteColors.length],
      caseId: selectedCase,
      ...position,
    }]);
    setNotesOpen(true);
  };

  const flagSelection = () => {
    if (!selectionDraft) return;
    const overlaps = notes.some((note) => (note.caseId ?? "timmy-two-shoes") === selectedCase && note.kind === "clip" && note.sourceBlock === selectionDraft.block &&
      typeof note.start === "number" && typeof note.end === "number" && selectionDraft.start < note.end && selectionDraft.end > note.start);
    if (overlaps) {
      setNoteToast("That passage is already flagged.");
      setSelectionDraft(null);
      window.getSelection()?.removeAllRanges();
      return;
    }
    const position = nextNotePosition();
    setNotes((current) => [...current, {
      id: window.crypto?.randomUUID?.() ?? `clip-${Date.now()}`,
      kind: "clip",
      text: selectionDraft.text,
      comment: "",
      color: noteColors[current.length % noteColors.length],
      caseId: selectedCase,
      sourceTab: selectionDraft.tab,
      sourceTitle: tabs.find((tab) => tab.key === selectionDraft.tab)?.label ?? "Case file",
      sourceBlock: selectionDraft.block,
      start: selectionDraft.start,
      end: selectionDraft.end,
      ...position,
    }]);
    setSelectionDraft(null);
    setNoteToast(germanCase ? "Hinweis in Bones' Notizen gespeichert." : "Evidence flagged to Bones' Notes.");
    window.getSelection()?.removeAllRanges();
  };

  const openNoteSource = (note: CaseNote) => {
    if (!note.sourceTab || !note.sourceBlock) return;
    setNotesOpen(false);
    setSelectedCase(note.caseId ?? "timmy-two-shoes");
    setCaseOpen(true);
    openTab(note.sourceTab);
    window.setTimeout(() => {
      const target = document.querySelector<HTMLElement>(`[data-evidence-id="${note.sourceBlock}"]`);
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      target?.classList.add("source-pulse");
      window.setTimeout(() => target?.classList.remove("source-pulse"), 1800);
    }, 80);
  };

  const updateTimelineEvent = (id: string, changes: Partial<TimelineEvent>) => {
    setTimeline((current) => current.map((event) => event.id === id ? { ...event, ...changes } : event));
  };

  const addBlankTimelineEvent = () => {
    setTimeline((current) => [...current, {
      id: window.crypto?.randomUUID?.() ?? `event-${Date.now()}`,
      caseId: selectedCase,
      text: "",
      time: "",
      comment: "",
    }]);
    setTimelineOpen(true);
  };

  const addSelectionToTimeline = () => {
    if (!selectionDraft) return;
    setTimeline((current) => [...current, {
      id: window.crypto?.randomUUID?.() ?? `event-${Date.now()}`,
      caseId: selectedCase,
      text: selectionDraft.text,
      time: "",
      comment: "",
      sourceTab: selectionDraft.tab,
      sourceTitle: tabs.find((tab) => tab.key === selectionDraft.tab)?.label ?? "Case file",
      sourceBlock: selectionDraft.block,
    }]);
    setSelectionDraft(null);
    setNoteToast(germanCase ? "Ereignis zur Zeitleiste hinzugefügt." : "Event added to the case timeline.");
    window.getSelection()?.removeAllRanges();
  };

  const moveTimelineEvent = (id: string, direction: -1 | 1) => {
    setTimeline((current) => {
      const scoped = current.filter((event) => event.caseId === selectedCase);
      const index = scoped.findIndex((event) => event.id === id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= scoped.length) return current;
      [scoped[index], scoped[target]] = [scoped[target], scoped[index]];
      let scopedIndex = 0;
      return current.map((event) => event.caseId === selectedCase ? scoped[scopedIndex++] : event);
    });
  };

  const openTimelineSource = (event: TimelineEvent) => {
    if (!event.sourceTab || !event.sourceBlock) return;
    setTimelineOpen(false);
    setSelectedCase(event.caseId);
    setCaseOpen(true);
    openTab(event.sourceTab);
    window.setTimeout(() => {
      const target = document.querySelector<HTMLElement>(`[data-evidence-id="${event.sourceBlock}"]`);
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      target?.classList.add("source-pulse");
      window.setTimeout(() => target?.classList.remove("source-pulse"), 1800);
    }, 80);
  };

  return (
    <main className="terminal-page">
      <section className="terminal-shell">
        <header className="system-bar">
          <div className="system-name"><button className="back-to-map-header" onClick={() => { sfxClick(); setView("map"); }} aria-label="Back to city map">← MAP</button><span className="status-light" />RPD EVIDENCE NETWORK</div>
          <div className="system-actions"><span>TERMINAL 04</span><button className="sound-toggle" onClick={() => { setMuted(toggleMute()); sfxClick(); }} aria-label={muted ? "Unmute" : "Mute"}>{muted ? "\u{1F507}" : "\u{1F50A}"}</button></div>
        </header>

        <HighlightsContext.Provider value={caseNotes}>
        {!caseOpen ? (
          <div className="desktop">
            <div className="desktop-grid" aria-hidden="true" />
            <div className="terminal-welcome">
              <p>SPECIAL INVESTIGATIONS DIVISION</p>
              <h1>Evidence Review Terminal</h1>
              <span>Authorized training access · Session active</span>
            </div>
            <button className="folder-button" onClick={() => { sfxOpen(); setFolderOpen(true); }} aria-label="Open Case Files folder">
              <FolderIcon />
              <span>CASE FILES</span>
            </button>
            <button className="folder-button notes-desktop-button" onClick={() => { sfxOpen(); setNotesOpen(true); }} aria-label="Open Bones' Notes">
              <NotepadIcon />
              <span>BONES&apos; NOTES</span>
              {caseNotes.length > 0 && <b>{caseNotes.length}</b>}
            </button>
            <button className="folder-button timeline-desktop-button" onClick={() => { sfxOpen(); setTimelineOpen(true); }} aria-label="Open case timeline">
              <TimelineIcon />
              <span>TIMELINE</span>
              {caseTimeline.length > 0 && <b>{caseTimeline.length}</b>}
            </button>
            <button className="folder-button report-desktop-button" onClick={() => { sfxOpen(); setSubmitOpen(true); }} aria-label="Open case report">
              <ReportIcon />
              <span>CASE REPORT<br />ABSCHLUSSBERICHT</span>
            </button>
            <div className="desktop-status"><span>1 case assigned</span><span>Network: secure</span></div>

            {folderOpen && (
              <section className="file-window" aria-label="Case Files folder">
                <header className="window-titlebar"><span><FolderIcon small />CASE FILES</span><button onClick={() => { sfxClose(); setFolderOpen(false); }} aria-label="Close folder">×</button></header>
                <div className="window-toolbar"><span>ACTIVE INVESTIGATIONS</span><span>1 ITEM</span></div>
                <div className="file-list">
                  <button className="case-file" onClick={() => openCase("timmy-two-shoes")}>
                    <span className="paper-file german-file" aria-hidden="true">TTS</span>
                    <span><strong>Der Brand in Timmy Two-Shoes&apos; Restaurant</strong><small>Aktenzeichen NPD-2026-1187 · Deutsch · 7 Dokumente</small></span>
                    <b aria-hidden="true">ÖFFNEN →</b>
                  </button>
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="case-reader">
            <header className="case-reader-titlebar"><span><FolderIcon small />CASE FILES</span><button onClick={() => { sfxClose(); setCaseOpen(false); }} aria-label="Close case files">×</button></header>
            <aside className="case-sidebar">
              <div className="case-id-block"><span>AKTIVER FALL</span><strong>TTS</strong><p>Der Brand in Timmy Two-Shoes&apos; Restaurant</p></div>
              <nav aria-label="Case documents">
                {currentTabs.map((tab) => (
                  <button key={tab.key} className={activeTab === tab.key ? "active" : ""} onClick={() => openTab(tab.key)}>
                    <span>{tab.code}</span><b>{tab.label}</b>{visited.has(tab.key) && <i aria-label="Read">●</i>}
                  </button>
                ))}
              </nav>
              <div className="case-tool-buttons">
                <button className="open-notes-button" onClick={() => setNotesOpen(true)}><NotepadIcon /><b>BONES&apos; NOTES</b><span>{caseNotes.length}</span></button>
                <button className="open-notes-button open-timeline-button" onClick={() => setTimelineOpen(true)}><TimelineIcon /><b>{germanCase ? "ZEITLEISTE" : "TIMELINE"}</b><span>{caseTimeline.length}</span></button>
              </div>
              <button className={submitted ? "submit-case-button submitted" : "submit-case-button"} onClick={() => setSubmitOpen(true)}><span>{submitted ? "✓" : "↗"}</span><b>{submitted ? "REPORT SUBMITTED / BERICHT EINGEREICHT" : "CASE REPORT / ABSCHLUSSBERICHT"}</b></button>
              <div className="review-meter"><span>{germanCase ? "DOKUMENTE GELESEN" : "DOCUMENTS REVIEWED"}</span><div><i style={{ width: `${(currentVisited / currentTabs.length) * 100}%` }} /></div><b>{currentVisited} / {currentTabs.length}</b></div>
            </aside>
            <section className="document-view">
              <div className="document-toolbar"><span>{activeTitle}</span><span>SELECT TEXT TO FLAG</span></div>
              <div className="document-scroll" onMouseUp={captureSelection} onTouchEnd={() => window.setTimeout(captureSelection, 0)}>
                {activeTab !== "timmy_task" && <TimmyReportTab reportKey={activeTab} />}
                {activeTab === "timmy_task" && <TimmyTaskTab onSubmit={() => setSubmitOpen(true)} />}
              </div>
            </section>
          </div>
        )}
        </HighlightsContext.Provider>
        {selectionDraft && (
          <div className="selection-tool" style={{ left: selectionDraft.x, top: selectionDraft.y }}>
            <button onClick={flagSelection}>⚑ {germanCase ? "ZU NOTIZEN" : "FLAG TO NOTES"}</button><button onClick={addSelectionToTimeline}>≡ {germanCase ? "ZUR ZEITLEISTE" : "ADD TO TIMELINE"}</button><button onClick={() => { setSelectionDraft(null); window.getSelection()?.removeAllRanges(); }} aria-label="Dismiss selection tool">×</button>
          </div>
        )}
        {noteToast && <div className="note-toast" role="status">{noteToast}</div>}
        {notesOpen && <NotesBoard notes={caseNotes} german={germanCase} onAdd={addBlankNote} onUpdate={updateNote} onDelete={(id) => setNotes((current) => current.filter((note) => note.id !== id))} onOpenSource={openNoteSource} onClose={() => setNotesOpen(false)} />}
        {timelineOpen && <TimelineBoard events={caseTimeline} german={germanCase} onAdd={addBlankTimelineEvent} onUpdate={updateTimelineEvent} onDelete={(id) => setTimeline((current) => current.filter((event) => event.id !== id))} onMove={moveTimelineEvent} onOpenSource={openTimelineSource} onClose={() => setTimelineOpen(false)} />}
        {submitOpen && <CaseReportApp caseId={selectedCase} report={currentReport} sources={reportSources} reviewed={currentVisited} total={currentTabs.length} onCaseChange={setSelectedCase} onChange={(report) => setReports((current) => ({ ...current, [selectedCase]: report }))} onClose={() => setSubmitOpen(false)} />}
      </section>
    </main>
  );
}
