import { useState } from "react";
import type { FormEvent } from "react";

export type ReportCaseId = "timmy-two-shoes" | "magyarosaurus";

export type CaseReportData = {
  investigator: string;
  body: string;
  submitted: boolean;
  submittedAt?: string;
};

export type ReportSource = {
  id: string;
  kind: "note" | "highlight" | "timeline" | "suspect";
  title: string;
  text: string;
  comment: string;
};

export function createEmptyReport(): CaseReportData {
  return {
    investigator: "",
    body: "",
    submitted: false,
  };
}

const caseMeta = {
  "timmy-two-shoes": {
    code: "NPD-2026-1187",
    titleEn: "The Timmy Two-Shoes Restaurant Fire",
    titleDe: "Der Brand in Timmy Two-Shoes' Restaurant",
    fileName: "NPD-2026-1187_Abschlussbericht.pdf",
  },
  "magyarosaurus": {
    code: "SID-2026-0002",
    titleEn: "The Missing Magyarosaurus",
    titleDe: "Der verschwundene Magyarosaurus",
    fileName: "SID-2026-0002_CaseReport.pdf",
  },
} satisfies Record<ReportCaseId, Record<string, string>>;

function DualLabel({ en, de }: { en: string; de: string }) {
  return <span className="dual-label"><b>{en}</b><small>{de}</small></span>;
}

function ReportIcon({ small = false }: { small?: boolean }) {
  return <span className={small ? "report-icon report-icon-small" : "report-icon"} aria-hidden="true"><i /><i /><i /></span>;
}

async function createReportPdf(caseId: ReportCaseId, report: CaseReportData) {
  const { jsPDF } = await import("jspdf");
  const meta = caseMeta[caseId];
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const textWidth = pageWidth - margin * 2;
  let y = 18;

  const addPage = () => {
    doc.addPage();
    y = 18;
  };

  const ensure = (height: number) => {
    if (y + height > pageHeight - 19) addPage();
  };

  const write = (text: string, options: { size?: number; bold?: boolean; color?: [number, number, number]; gap?: number } = {}) => {
    const { size = 10, bold = false, color = [30, 43, 46], gap = 3 } = options;
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text || "—", textWidth) as string[];
    const lineHeight = size * 0.42;
    ensure(lines.length * lineHeight + gap);
    doc.text(lines, margin, y);
    y += lines.length * lineHeight + gap;
  };

  doc.setFillColor(7, 33, 40);
  doc.rect(0, 0, pageWidth, 42, "F");
  doc.setTextColor(196, 226, 221);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("SPECIAL INVESTIGATIONS DIVISION", margin, 14);
  doc.setFontSize(19);
  doc.text("CASE REPORT / ABSCHLUSSBERICHT", margin, 25);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`CASE / FALL: ${meta.code}`, margin, 34);
  y = 51;

  write(meta.titleEn, { size: 16, bold: true, gap: 1.5 });
  write(meta.titleDe, { size: 11, color: [80, 96, 96], gap: 5 });
  write(`Investigator / Ermittler: ${report.investigator}`, { size: 10, gap: 1.5 });
  write(`Submitted / Eingereicht: ${new Date(report.submittedAt ?? Date.now()).toLocaleString("de-DE")}`, { size: 9, color: [90, 101, 100], gap: 6 });

  y += 2;
  doc.setDrawColor(56, 91, 92);
  doc.setLineWidth(0.45);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;
  write("REPORT / BERICHT", { size: 10, bold: true, color: [29, 78, 78], gap: 4 });

  const bodyLines = report.body.split("\n");
  for (const line of bodyLines) {
    if (line.trim()) {
      write(line, { size: 10, gap: 3 });
    } else {
      y += 3;
    }
  }

  const pages = doc.getNumberOfPages();
  for (let page = 1; page <= pages; page += 1) {
    doc.setPage(page);
    doc.setDrawColor(170, 180, 177);
    doc.line(margin, pageHeight - 13, pageWidth - margin, pageHeight - 13);
    doc.setFont("courier", "normal");
    doc.setFontSize(7);
    doc.setTextColor(105, 116, 113);
    doc.text(`SPECIAL INVESTIGATIONS · ${meta.code}`, margin, pageHeight - 8);
    doc.text(`${page} / ${pages}`, pageWidth - margin, pageHeight - 8, { align: "right" });
  }

  doc.save(meta.fileName);
}

function SourcePicker({ sources, onChoose, onClose }: { sources: ReportSource[]; onChoose: (source: ReportSource) => void; onClose: () => void }) {
  const [filter, setFilter] = useState<"all" | "note" | "highlight" | "timeline" | "suspect">("all");
  const filtered = filter === "all" ? sources : sources.filter((s) => s.kind === filter);

  const kindLabel = (kind: ReportSource["kind"]) => {
    if (kind === "timeline") return "TIMELINE / ZEITLEISTE";
    if (kind === "highlight") return "HIGHLIGHT / MARKIERUNG";
    if (kind === "suspect") return "SUSPECT / VERDÄCHTIGE";
    return "NOTE / NOTIZ";
  };

  return (
    <div className="report-source-shade" role="dialog" aria-modal="true" aria-labelledby="source-picker-title">
      <section className="report-source-picker">
        <header><div><b id="source-picker-title">INSERT MATERIAL</b><small>MATERIAL EINFÜGEN</small></div><button type="button" onClick={onClose} aria-label="Close evidence picker">×</button></header>
        <div className="source-filter-bar">
          {(["all", "note", "highlight", "timeline", "suspect"] as const).map((f) => (
            <button key={f} type="button" className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>
              {f === "all" ? "ALL / ALLE" : f === "note" ? "NOTES" : f === "highlight" ? "HIGHLIGHTS" : f === "timeline" ? "TIMELINE" : "SUSPECTS"}
            </button>
          ))}
        </div>
        <div className="report-source-list">
          {!filtered.length && <div className="report-source-empty">No saved material for this case. / Für diesen Fall gibt es noch keine gespeicherten Notizen.</div>}
          {filtered.map((source) => (
            <button type="button" key={source.id} onClick={() => onChoose(source)}>
              <span>{kindLabel(source.kind)}</span>
              <b>{source.title}</b>
              <p>{source.text}</p>
              {source.comment.trim() && <small>{source.comment}</small>}
              <i>INSERT / EINFÜGEN →</i>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export function CaseReportApp({
  caseId,
  report,
  sources,
  reviewed,
  total,
  onCaseChange,
  onChange,
  onClose,
}: {
  caseId: ReportCaseId;
  report: CaseReportData;
  sources: ReportSource[];
  reviewed: number;
  total: number;
  onCaseChange: (caseId: ReportCaseId) => void;
  onChange: (report: CaseReportData) => void;
  onClose: () => void;
}) {
  const [picker, setPicker] = useState(false);
  const [status, setStatus] = useState("");
  const meta = caseMeta[caseId];
  const bodyRef = useState<HTMLTextAreaElement | null>(null);

  const change = (patch: Partial<CaseReportData>) => {
    onChange({ ...report, ...patch, submitted: false, submittedAt: undefined });
    setStatus("");
  };

  const insertSource = (source: ReportSource) => {
    const insertion = source.comment.trim()
      ? `[${source.title}] ${source.text}\n→ ${source.comment}\n`
      : `[${source.title}] ${source.text}\n`;
    const textarea = bodyRef[0];
    if (textarea) {
      const start = textarea.selectionStart ?? report.body.length;
      const before = report.body.slice(0, start);
      const after = report.body.slice(start);
      const needsNewline = before.length > 0 && !before.endsWith("\n") ? "\n" : "";
      change({ body: before + needsNewline + insertion + after });
    } else {
      const needsNewline = report.body.length > 0 && !report.body.endsWith("\n") ? "\n" : "";
      change({ body: report.body + needsNewline + insertion });
    }
    setPicker(false);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const finalReport: CaseReportData = { ...report, submitted: true, submittedAt: new Date().toISOString() };
    onChange(finalReport);
    setStatus("Creating PDF… / PDF wird erstellt…");
    try {
      await createReportPdf(caseId, finalReport);
      setStatus("Report submitted and downloaded. / Bericht eingereicht und heruntergeladen.");
    } catch {
      onChange({ ...finalReport, submitted: false, submittedAt: undefined });
      setStatus("The PDF could not be created. Please try again. / Das PDF konnte nicht erstellt werden. Bitte versuche es erneut.");
    }
  };

  const wordCount = report.body.trim() ? report.body.trim().split(/\s+/).length : 0;

  return (
    <section className="case-report-app" role="dialog" aria-modal="true" aria-labelledby="case-report-title">
      <header className="case-report-bar"><div><ReportIcon small /><span><b id="case-report-title">CASE REPORT</b><small>ABSCHLUSSBERICHT</small></span></div><button type="button" onClick={onClose} aria-label="Close case report">×</button></header>
      <div className="case-report-scroll">
        <form className="case-report-paper" onSubmit={submit}>
          <div className="report-letterhead"><p>RIVERSIDE POLICE DEPARTMENT</p><h1>Special Investigations Division</h1><span>Final investigative assessment / Abschließende Ermittlungsbewertung</span></div>

          <section className="report-case-meta">
            <label><DualLabel en="Case" de="Fall" /><select value={caseId} onChange={(event) => onCaseChange(event.target.value as ReportCaseId)}><option value="timmy-two-shoes">NPD-2026-1187 — Timmy Two-Shoes</option><option value="magyarosaurus">SID-2026-0002 — Magyarosaurus</option></select></label>
            <div><DualLabel en="Case number" de="Aktenzeichen" /><strong>{meta.code}</strong></div>
            <label><DualLabel en="Investigator or student" de="Ermittler oder Schüler" /><input value={report.investigator} onChange={(event) => change({ investigator: event.target.value })} required placeholder="Name / Name" /></label>
            <div><DualLabel en="Documents reviewed" de="Gelesene Dokumente" /><strong>{reviewed} / {total}</strong></div>
          </section>

          <section className="report-body-section">
            <header><span>01</span><div><h2>Your report</h2><p>Dein Bericht</p></div></header>
            <p className="report-instruction">Write your findings. Use evidence from the case files to support your conclusions. You can insert material from your notes, timeline, and suspects board using the button below. / Schreibe deine Erkenntnisse. Verwende Beweise aus den Fallakten, um deine Schlussfolgerungen zu stützen.</p>
            <div className="report-body-controls">
              <button type="button" className="insert-source-button" onClick={() => setPicker(true)}>＋ INSERT FROM NOTES · TIMELINE · SUSPECTS / AUS NOTIZEN · ZEITLEISTE · VERDÄCHTIGE EINFÜGEN</button>
              <span className="report-word-count">{wordCount} {wordCount === 1 ? "word / Wort" : "words / Wörter"}</span>
            </div>
            <textarea
              className="report-body-textarea"
              ref={(el) => { bodyRef[0] = el; }}
              value={report.body}
              onChange={(event) => change({ body: event.target.value })}
              rows={18}
              required
              minLength={40}
              placeholder={"Write your case report here…\n\nConsider:\n- What happened?\n- Who is responsible and why?\n- What evidence supports your conclusion?\n- Were there problems with the police investigation?\n\n---\n\nSchreibe deinen Fallbericht hier…\n\nBedenke:\n- Was ist passiert?\n- Wer ist verantwortlich und warum?\n- Welche Beweise stützen deine Schlussfolgerung?\n- Gab es Probleme bei der Polizeiermittlung?"}
            />
          </section>

          <footer className="report-submit-footer">
            <div>{report.submitted && <span className="report-submitted-stamp">SUBMITTED / EINGEREICHT</span>}<p>{status || "Draft saved on this device. / Entwurf auf diesem Gerät gespeichert."}</p></div>
            <button type="submit">SUBMIT &amp; DOWNLOAD REPORT<br /><small>BERICHT EINREICHEN &amp; HERUNTERLADEN</small></button>
          </footer>
        </form>
      </div>
      {picker && <SourcePicker sources={sources} onChoose={insertSource} onClose={() => setPicker(false)} />}
    </section>
  );
}

export { ReportIcon };
