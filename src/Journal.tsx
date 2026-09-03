import { useState } from "react";
import { journalEntriesByDifficulty } from "./journal-data";
import { getForDifficulty } from "./difficulty";
import type { Difficulty } from "./types";

export function JournalIcon() {
  return <span className="journal-icon" aria-hidden="true"><i /><i /><i /></span>;
}

interface Props {
  onClose: () => void;
  difficulty: Difficulty;
}

export default function Journal({ onClose, difficulty }: Props) {
  const entries = getForDifficulty(journalEntriesByDifficulty, difficulty);
  const [activeEntry, setActiveEntry] = useState<number | null>(null);
  const [mcAnswers, setMcAnswers] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [openAnswers, setOpenAnswers] = useState<Record<string, string>>({});

  const entry = activeEntry !== null ? entries[activeEntry] : null;

  if (!entry) {
    return (
      <section className="journal-window" role="dialog" aria-modal="true" aria-label="Bones' Journal">
        <header className="window-titlebar">
          <span><JournalIcon /> BONES&apos; JOURNAL</span>
          <button onClick={onClose} aria-label="Close journal">&times;</button>
        </header>
        <div className="window-toolbar">
          <span>DIARY ENTRIES</span>
          <span>{entries.length} {entries.length === 1 ? "ENTRY" : "ENTRIES"}</span>
        </div>
        <div className="journal-entry-list">
          {entries.map((e, i) => (
            <button key={e.id} className="journal-entry-item" onClick={() => setActiveEntry(i)}>
              <span className="journal-entry-number">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <strong>{e.title}</strong>
                <small>{e.subtitle}</small>
              </span>
              <b>READ &rarr;</b>
            </button>
          ))}
        </div>
      </section>
    );
  }

  const mcQuestions = entry.questions.filter((q) => q.options);
  const score = mcQuestions.filter((q) => checked.has(q.id) && mcAnswers[q.id] === q.correctIndex).length;
  const mcChecked = mcQuestions.filter((q) => checked.has(q.id)).length;
  const allMcDone = mcChecked === mcQuestions.length;

  return (
    <section className="journal-window journal-reading" role="dialog" aria-modal="true" aria-label="Bones' Journal">
      <header className="window-titlebar">
        <span><JournalIcon /> BONES&apos; JOURNAL</span>
        <button onClick={onClose} aria-label="Close journal">&times;</button>
      </header>
      <div className="window-toolbar">
        <button className="journal-back" onClick={() => { setActiveEntry(null); setMcAnswers({}); setChecked(new Set()); setOpenAnswers({}); }}>&larr; ENTRIES</button>
        <span>{entry.title} &mdash; {entry.subtitle}</span>
      </div>
      <div className="journal-scroll">
        <article className="journal-page">
          <h2 className="journal-heading">Diary of Special Investigator Bones</h2>
          <h3 className="journal-subheading">{entry.title}</h3>
          {entry.paragraphs.map((p, i) =>
            p.type === "quote" ? (
              <blockquote key={i} className="journal-quote">{p.text}</blockquote>
            ) : (
              <p key={i} className="journal-paragraph">{p.text}</p>
            ),
          )}
        </article>

        <section className="journal-questions">
          <h3>Comprehension Check</h3>
          <p className="journal-questions-intro">Answer the following questions about the diary entry above.</p>

          {entry.questions.map((q, qi) => {
            if (!q.options) {
              return (
                <div key={q.id} className="journal-q journal-q-open">
                  <p className="journal-q-text"><span>{qi + 1}.</span> {q.question}</p>
                  <textarea
                    className="journal-answer"
                    value={openAnswers[q.id] ?? ""}
                    onChange={(e) => setOpenAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                    placeholder="Write your answer here..."
                    rows={4}
                  />
                </div>
              );
            }

            const isChecked = checked.has(q.id);
            const selected = mcAnswers[q.id];
            const isCorrect = isChecked && selected === q.correctIndex;

            return (
              <div key={q.id} className={`journal-q${isChecked ? (isCorrect ? " q-correct" : " q-incorrect") : ""}`}>
                <p className="journal-q-text"><span>{qi + 1}.</span> {q.question}</p>
                <div className="journal-options">
                  {q.options.map((opt, oi) => {
                    let cls = "journal-opt";
                    if (selected === oi && !isChecked) cls += " selected";
                    if (isChecked && oi === q.correctIndex) cls += " correct-answer";
                    if (isChecked && selected === oi && oi !== q.correctIndex) cls += " wrong-answer";
                    return (
                      <button
                        key={oi}
                        className={cls}
                        onClick={() => { if (!isChecked) setMcAnswers((prev) => ({ ...prev, [q.id]: oi })); }}
                        disabled={isChecked}
                      >
                        <span className="opt-letter">{String.fromCharCode(65 + oi)}</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {selected !== undefined && !isChecked && (
                  <button className="journal-check-btn" onClick={() => setChecked((prev) => new Set(prev).add(q.id))}>Check Answer</button>
                )}
                {isChecked && (
                  <p className="journal-feedback">
                    {isCorrect ? "✓ Correct! " : `✗ Not quite. The answer is ${String.fromCharCode(65 + q.correctIndex!)}. `}
                    {q.explanation}
                  </p>
                )}
              </div>
            );
          })}

          {allMcDone && (
            <div className="journal-score">
              <p className="journal-score-number">{score} / {mcQuestions.length}</p>
              {score === mcQuestions.length ? (
                <p className="journal-score-msg perfect">Perfect score! Outstanding reading comprehension.</p>
              ) : score >= Math.ceil(mcQuestions.length * 0.7) ? (
                <p className="journal-score-msg good">Good work! You understood the key details of Bones&apos; diary.</p>
              ) : (
                <p className="journal-score-msg retry">Try re-reading the diary entry to catch the details you missed.</p>
              )}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
