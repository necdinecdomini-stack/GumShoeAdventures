import { useState } from "react";
import type { FormEvent } from "react";

export type ReportCaseId = "riverside" | "timmy-two-shoes";
export type PoliceDecision = "" | "correct" | "incorrect" | "insufficient";
export type ResponsibilityType = "" | "person-group" | "accident" | "unknown";

export type EvidencePair = {
  evidence: string;
  explanation: string;
};

export type CaseReportData = {
  investigator: string;
  policeDecision: PoliceDecision;
  policeProblems: EvidencePair[];
  responsibilityType: ResponsibilityType;
  responsibleParty: string;
  supportingEvidence: EvidencePair[];
  submitted: boolean;
  submittedAt?: string;
};

export type ReportSource = {
  id: string;
  kind: "note" | "highlight" | "timeline";
  title: string;
  text: string;
  comment: string;
};

const emptyPair = (): EvidencePair => ({ evidence: "", explanation: "" });

export function createEmptyReport(): CaseReportData {
  return {
    investigator: "",
    policeDecision: "",
    policeProblems: Array.from({ length: 5 }, emptyPair),
    responsibilityType: "",
    responsibleParty: "",
    supportingEvidence: Array.from({ length: 5 }, emptyPair),
    submitted: false,
  };
}

const caseMeta = {
  riverside: {
    code: "81-F",
    titleEn: "Riverside Community Hall Fire",
    titleDe: "Brand im Gemeindehaus Riverside",
    conclusionEn: "Tomas Biro deliberately started the fire.",
    conclusionDe: "Tomas Biro hat den Brand absichtlich gelegt.",
    fileName: "Case_81-F_Final_Report.pdf",
  },
  "timmy-two-shoes": {
    code: "MPD-2026-1187",
    titleEn: "The Timmy Two-Shoes Restaurant Fire",
    titleDe: "Der Brand in Timmy Two-Shoes' Restaurant",
    conclusionEn: "Salvatore DiMarco committed arson and insurance fraud.",
    conclusionDe: "Salvatore DiMarco beging Brandstiftung und Versicherungsbetrug.",
    fileName: "MPD-2026-1187_Abschlussbericht.pdf",
  },
} satisfies Record<ReportCaseId, Record<string, string>>;

const policeDecisionLabels: Record<Exclude<PoliceDecision, "">, string> = {
  correct: "Correct / Richtig",
  incorrect: "Incorrect / Falsch",
  insufficient: "Not enough evidence / Nicht genügend Beweise",
};

const responsibilityLabels: Record<Exclude<ResponsibilityType, "">, string> = {
  "person-group": "Person or group / Person oder Gruppe",
  accident: "Accident / Unfall",
  unknown: "Unknown / Unbekannt",
};

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

  const section = (number: string, en: string, de: string) => {
    ensure(15);
    y += 3;
    doc.setDrawColor(56, 91, 92);
    doc.setLineWidth(0.45);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;
    write(`${number}  ${en.toUpperCase()} / ${de.toUpperCase()}`, { size: 10, bold: true, color: [29, 78, 78], gap: 4 });
  };

  const pairBlock = (index: number, pair: EvidencePair, evidenceLabel: string, explanationLabel: string) => {
    if (!pair.evidence.trim() && !pair.explanation.trim()) return;
    ensure(18);
    write(`${index + 1}. ${evidenceLabel}`, { size: 8, bold: true, color: [100, 111, 108], gap: 1.5 });
    write(pair.evidence, { size: 10, gap: 2.5 });
    write(explanationLabel, { size: 8, bold: true, color: [100, 111, 108], gap: 1.5 });
    write(pair.explanation, { size: 10, gap: 5 });
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
  write(`Submitted / Eingereicht: ${new Date(report.submittedAt ?? Date.now()).toLocaleString("de-DE")}`, { size: 9, color: [90, 101, 100], gap: 4 });

  section("1", "Police conclusion", "Schlussfolgerung der Polizei");
  write(meta.conclusionEn, { size: 10, gap: 1.5 });
  write(meta.conclusionDe, { size: 10, color: [83, 96, 95], gap: 3 });
  write(`Assessment / Bewertung: ${report.policeDecision ? policeDecisionLabels[report.policeDecision] : "—"}`, { size: 10, bold: true, gap: 4 });

  if (report.policeDecision !== "correct") {
    section("2", "Problems with the police case", "Probleme mit der Polizeiermittlung");
    report.policeProblems.forEach((pair, index) => pairBlock(index, pair, "Police claim or evidence / Behauptung oder Beweis der Polizei", "Why it is wrong, unreliable or insufficient / Warum ist dies falsch, unzuverlässig oder unzureichend?"));
  }

  section("3", "Final determination", "Abschließende Beurteilung");
  write(`Responsibility / Verantwortung: ${report.responsibilityType ? responsibilityLabels[report.responsibilityType] : "—"}`, { size: 10, bold: true, gap: 2 });
  if (report.responsibilityType === "person-group") write(`Person or group / Person oder Gruppe: ${report.responsibleParty}`, { size: 10, gap: 4 });

  section("4", "Supporting evidence", "Unterstützende Beweise");
  report.supportingEvidence.forEach((pair, index) => pairBlock(index, pair, "Evidence / Beweis", "Why it supports the conclusion / Warum stützt dies die Schlussfolgerung?"));

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

function EvidenceRows({
  rows,
  section,
  required,
  onChange,
  onPick,
}: {
  rows: EvidencePair[];
  section: "police" | "support";
  required: boolean;
  onChange: (rows: EvidencePair[]) => void;
  onPick: (index: number) => void;
}) {
  const update = (index: number, field: keyof EvidencePair, value: string) => {
    onChange(rows.map((row, rowIndex) => rowIndex === index ? { ...row, [field]: value } : row));
  };

  return (
    <div className="report-evidence-list">
      {rows.map((row, index) => (
        <article className="report-evidence-card" key={`${section}-${index}`}>
          <div className="report-evidence-number">{index + 1}</div>
          <div className="report-evidence-fields">
            <label>
              <DualLabel en={section === "police" ? "Police claim or evidence" : "Supporting evidence"} de={section === "police" ? "Behauptung oder Beweis der Polizei" : "Unterstützender Beweis"} />
              <textarea value={row.evidence} onChange={(event) => update(index, "evidence", event.target.value)} rows={3} required={required && index === 0} placeholder={section === "police" ? "Copy or describe the police claim… / Behauptung oder Beweis eintragen…" : "Enter the evidence… / Beweis eintragen…"} />
            </label>
            <button type="button" className="insert-source-button" onClick={() => onPick(index)}>＋ INSERT FROM NOTES / AUS NOTIZEN EINFÜGEN</button>
            <label>
              <DualLabel en={section === "police" ? "Why is it wrong, unreliable or insufficient?" : "Why does this support your conclusion?"} de={section === "police" ? "Warum ist dies falsch, unzuverlässig oder unzureichend?" : "Warum stützt dies deine Schlussfolgerung?"} />
              <textarea value={row.explanation} onChange={(event) => update(index, "explanation", event.target.value)} rows={3} required={required && index === 0} placeholder="Explain why… / Begründe warum…" />
            </label>
          </div>
        </article>
      ))}
    </div>
  );
}

function SourcePicker({ sources, onChoose, onClose }: { sources: ReportSource[]; onChoose: (source: ReportSource) => void; onClose: () => void }) {
  return (
    <div className="report-source-shade" role="dialog" aria-modal="true" aria-labelledby="source-picker-title">
      <section className="report-source-picker">
        <header><div><b id="source-picker-title">INSERT EVIDENCE</b><small>BEWEIS EINFÜGEN</small></div><button type="button" onClick={onClose} aria-label="Close evidence picker">×</button></header>
        <p>Select a saved note, highlighted passage or timeline event. / Wähle eine Notiz, eine markierte Passage oder ein Ereignis aus der Zeitleiste.</p>
        <div className="report-source-list">
          {!sources.length && <div className="report-source-empty">No saved material for this case. / Für diesen Fall gibt es noch keine gespeicherten Notizen.</div>}
          {sources.map((source) => (
            <button type="button" key={source.id} onClick={() => onChoose(source)}>
              <span>{source.kind === "timeline" ? "TIMELINE / ZEITLEISTE" : source.kind === "highlight" ? "HIGHLIGHT / MARKIERUNG" : "NOTE / NOTIZ"}</span>
              <b>{source.title}</b>
              <p>{source.text}</p>
              <small>{source.comment.trim() ? source.comment : "No explanation yet — write it in the report. / Noch keine Erklärung — schreibe sie im Bericht."}</small>
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
  const [picker, setPicker] = useState<{ section: "police" | "support"; index: number } | null>(null);
  const [status, setStatus] = useState("");
  const meta = caseMeta[caseId];

  const change = (patch: Partial<CaseReportData>) => {
    onChange({ ...report, ...patch, submitted: false, submittedAt: undefined });
    setStatus("");
  };

  const chooseSource = (source: ReportSource) => {
    if (!picker) return;
    const key = picker.section === "police" ? "policeProblems" : "supportingEvidence";
    const rows = report[key].map((row, index) => index === picker.index ? {
      ...row,
      evidence: source.text,
      explanation: row.explanation.trim() ? row.explanation : source.comment.trim(),
    } : row);
    change({ [key]: rows });
    setPicker(null);
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

  return (
    <section className="case-report-app" role="dialog" aria-modal="true" aria-labelledby="case-report-title">
      <header className="case-report-bar"><div><ReportIcon small /><span><b id="case-report-title">CASE REPORT</b><small>ABSCHLUSSBERICHT</small></span></div><button type="button" onClick={onClose} aria-label="Close case report">×</button></header>
      <div className="case-report-scroll">
        <form className="case-report-paper" onSubmit={submit}>
          <div className="report-letterhead"><p>RIVERSIDE POLICE DEPARTMENT</p><h1>Special Investigations Division</h1><span>Final investigative assessment / Abschließende Ermittlungsbewertung</span></div>

          <section className="report-case-meta">
            <label><DualLabel en="Case" de="Fall" /><select value={caseId} onChange={(event) => onCaseChange(event.target.value as ReportCaseId)}><option value="riverside">81-F — Riverside Community Hall Fire</option><option value="timmy-two-shoes">MPD-2026-1187 — Timmy Two-Shoes</option></select></label>
            <div><DualLabel en="Case number" de="Aktenzeichen" /><strong>{meta.code}</strong></div>
            <label><DualLabel en="Investigator or student" de="Ermittler oder Schüler" /><input value={report.investigator} onChange={(event) => change({ investigator: event.target.value })} required placeholder="Name / Name" /></label>
            <div><DualLabel en="Documents reviewed" de="Gelesene Dokumente" /><strong>{reviewed} / {total}</strong></div>
          </section>

          <section className="report-section">
            <header><span>01</span><div><h2>Police conclusion</h2><p>Schlussfolgerung der Polizei</p></div></header>
            <div className="police-conclusion"><p>{meta.conclusionEn}</p><span>{meta.conclusionDe}</span></div>
            <fieldset className="report-choice-grid">
              <legend><DualLabel en="Was the police conclusion correct?" de="War die Schlussfolgerung der Polizei richtig?" /></legend>
              {(["correct", "incorrect", "insufficient"] as const).map((value) => (
                <label key={value} className={report.policeDecision === value ? "selected" : ""}><input type="radio" name="police-decision" checked={report.policeDecision === value} onChange={() => change({ policeDecision: value })} required /><span>{policeDecisionLabels[value]}</span></label>
              ))}
            </fieldset>
          </section>

          {(report.policeDecision === "incorrect" || report.policeDecision === "insufficient") && (
            <section className="report-section">
              <header><span>02</span><div><h2>Problems with the police case</h2><p>Probleme mit der Polizeiermittlung</p></div></header>
              <p className="report-instruction">Identify up to five specific problems. Explain each one in your own words. / Nenne bis zu fünf konkrete Probleme und erkläre jedes mit deinen eigenen Worten.</p>
              <EvidenceRows rows={report.policeProblems} section="police" required onChange={(policeProblems) => change({ policeProblems })} onPick={(index) => setPicker({ section: "police", index })} />
            </section>
          )}

          <section className="report-section">
            <header><span>03</span><div><h2>Final determination</h2><p>Abschließende Beurteilung</p></div></header>
            <fieldset className="report-choice-grid responsibility-grid">
              <legend><DualLabel en="Who or what was responsible?" de="Wer oder was war verantwortlich?" /></legend>
              {(["person-group", "accident", "unknown"] as const).map((value) => (
                <label key={value} className={report.responsibilityType === value ? "selected" : ""}><input type="radio" name="responsibility" checked={report.responsibilityType === value} onChange={() => change({ responsibilityType: value })} required /><span>{responsibilityLabels[value]}</span></label>
              ))}
            </fieldset>
            {report.responsibilityType === "person-group" && <label className="responsible-party-field"><DualLabel en="Responsible person or group" de="Verantwortliche Person oder Gruppe" /><input value={report.responsibleParty} onChange={(event) => change({ responsibleParty: event.target.value })} required placeholder="Name of person or group / Name der Person oder Gruppe" /></label>}
          </section>

          <section className="report-section">
            <header><span>04</span><div><h2>Supporting evidence</h2><p>Unterstützende Beweise</p></div></header>
            <p className="report-instruction">Give up to five pieces of evidence supporting your conclusion. / Nenne bis zu fünf Beweise, die deine Schlussfolgerung stützen.</p>
            <EvidenceRows rows={report.supportingEvidence} section="support" required onChange={(supportingEvidence) => change({ supportingEvidence })} onPick={(index) => setPicker({ section: "support", index })} />
          </section>

          <footer className="report-submit-footer">
            <div>{report.submitted && <span className="report-submitted-stamp">SUBMITTED / EINGEREICHT</span>}<p>{status || "Draft saved on this device. / Entwurf auf diesem Gerät gespeichert."}</p></div>
            <button type="submit">SUBMIT &amp; DOWNLOAD REPORT<br /><small>BERICHT EINREICHEN &amp; HERUNTERLADEN</small></button>
          </footer>
        </form>
      </div>
      {picker && <SourcePicker sources={sources} onChoose={chooseSource} onClose={() => setPicker(null)} />}
    </section>
  );
}

export { ReportIcon };
