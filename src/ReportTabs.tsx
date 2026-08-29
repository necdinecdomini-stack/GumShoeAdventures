import { timmyQuestions, timmyReports } from "./timmy-data";
import { magyarReports } from "./magyarosaurus-data";
import { magyarReportsDe } from "./magyarosaurus-data-de";
import { EvidenceParagraph } from "./HighlightedText";
import type { TabKey } from "./types";

export function TimmyReportTab({ reportKey }: { reportKey: TabKey }) {
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

export function MagyarReportTab({ reportKey, lang }: { reportKey: TabKey; lang: "en" | "de" }) {
  const reports = lang === "de" ? magyarReportsDe : magyarReports;
  const report = reports.find((item) => item.key === reportKey);
  if (!report) return null;
  return (
    <article className="document-page">
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

export function TimmyTaskTab({ onSubmit }: { onSubmit: () => void }) {
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
