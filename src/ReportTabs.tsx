import { timmyReportsByDifficulty, timmyQuestionsByDifficulty } from "./timmy-data";
import { magyarReportsByDifficulty } from "./magyarosaurus-data";
import { magyarReportsDeByDifficulty } from "./magyarosaurus-data-de";
import { telescopeReportsByDifficulty, telescopeQuestionsByDifficulty } from "./telescope-data";
import { getForDifficulty } from "./difficulty";
import { EvidenceParagraph } from "./HighlightedText";
import type { Difficulty, TabKey } from "./types";

export function TimmyReportTab({ reportKey, difficulty }: { reportKey: TabKey; difficulty: Difficulty }) {
  const reports = getForDifficulty(timmyReportsByDifficulty, difficulty);
  const report = reports.find((item) => item.key === reportKey);
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

export function MagyarReportTab({ reportKey, lang, difficulty }: { reportKey: TabKey; lang: "en" | "de"; difficulty: Difficulty }) {
  const reports = lang === "de"
    ? getForDifficulty(magyarReportsDeByDifficulty, difficulty)
    : getForDifficulty(magyarReportsByDifficulty, difficulty);
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

export function TimmyTaskTab({ onSubmit, difficulty }: { onSubmit: () => void; difficulty: Difficulty }) {
  const questions = getForDifficulty(timmyQuestionsByDifficulty, difficulty);
  return (
    <article className="document-page german-document">
      <header className="document-heading">
        <p>Sonderermittlungen · Ausbildungsauftrag</p>
        <h2>Der Brand in Timmy Two-Shoes&apos; Restaurant</h2>
        <span>7 Berichte · 4 mögliche Antworten · 1 Urteil</span>
      </header>
      <EvidenceParagraph id="timmy-task-intro" className="task-note">Lies alle sieben Berichte. Ordne die Ereignisse auf der Zeitleiste und vergleiche die Aussagen. Entscheide dann, wer das Restaurant wahrscheinlich angezündet hat. Eine verdächtige Person ist nicht automatisch der Täter.</EvidenceParagraph>
      <div className="suspect-strip"><span>NIEMAND — UNFALL</span><span>SAL MONTENEGRO</span><span>TIMMY BIANCHI</span><span>DIE MAFIA</span></div>
      <ol className="task-list">{questions.map((question, index) => <li key={question}><span>{String(index + 1).padStart(2, "0")}</span><EvidenceParagraph id={`timmy-question-${index}`}>{question}</EvidenceParagraph></li>)}</ol>
      <div className="task-submit-panel">
        <div><span>LETZTER SCHRITT</span><strong>Bereit, den Fall abzuschließen?</strong><p>Gib dein Urteil ab und erkläre, welche Hinweise es stützen.</p></div>
        <button onClick={onSubmit}>FALL EINREICHEN →</button>
      </div>
      <footer className="page-stamp">TIMMY TWO-SHOES / AUFTRAG 07</footer>
    </article>
  );
}

export function TelescopeReportTab({ reportKey, difficulty }: { reportKey: TabKey; difficulty: Difficulty }) {
  const reports = getForDifficulty(telescopeReportsByDifficulty, difficulty);
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
            {section.table && (
              <div className="evidence-table-wrap">
                <table className="evidence-table">
                  <thead><tr>{section.table.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
                  <tbody>
                    {section.table.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className={row[3] && row[3] !== "—" ? "error-row" : ""}>
                        {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </section>
      <footer className="page-stamp">{report.stamp}</footer>
    </article>
  );
}

export function TelescopeTaskTab({ onSubmit, difficulty }: { onSubmit: () => void; difficulty: Difficulty }) {
  const questions = getForDifficulty(telescopeQuestionsByDifficulty, difficulty);
  return (
    <article className="document-page">
      <header className="document-heading">
        <p>Special Investigations · Training Assignment</p>
        <h2>The Broken Telescope</h2>
        <span>5 documents · 4 suspects · 1 verdict</span>
      </header>
      <EvidenceParagraph id="telescope-task-intro" className="task-note">Read all five documents. Compare the activity log with the scientists' statements. Then decide who is most likely responsible for the telescope problems. A suspicious person is not automatically guilty.</EvidenceParagraph>
      <div className="suspect-strip"><span>NOBODY — ACCIDENT</span><span>DR. STAHL</span><span>DR. MAREK</span><span>DR. BRENNER</span><span>DR. ZELLER</span></div>
      <ol className="task-list">{questions.map((question, index) => <li key={question}><span>{String(index + 1).padStart(2, "0")}</span><EvidenceParagraph id={`telescope-question-${index}`}>{question}</EvidenceParagraph></li>)}</ol>
      <div className="task-submit-panel">
        <div><span>FINAL STEP</span><strong>Ready to close the case?</strong><p>Give your verdict and explain which evidence supports it.</p></div>
        <button onClick={onSubmit}>SUBMIT CASE REPORT →</button>
      </div>
      <footer className="page-stamp">BROKEN TELESCOPE / ASSIGNMENT 06</footer>
    </article>
  );
}
