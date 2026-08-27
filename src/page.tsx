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
type TabKey = "summary" | "brigade" | "investigator" | "court" | "tomas" | "task" | "timmy_fire" | "timmy_insurance" | "timmy_police" | "timmy_agnes" | "timmy_tony" | "timmy_vandalism" | "timmy_task";
type Verdict = "" | "tomas" | "another" | "accident" | "insufficient" | "sal" | "timmy" | "mafia";
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

const riversideTabs: { key: TabKey; label: string; code: string }[] = [
  { key: "summary", label: "Case Summary", code: "01" },
  { key: "brigade", label: "Fire Brigade Report", code: "02" },
  { key: "investigator", label: "Investigator Report", code: "03" },
  { key: "court", label: "Court Testimony", code: "04" },
  { key: "tomas", label: "Tomas Biro", code: "05" },
  { key: "task", label: "Student Task", code: "06" },
];

const timmyTabs: { key: TabKey; label: string; code: string }[] = [
  ...timmyReports.map((report) => ({ key: report.key as TabKey, label: report.label, code: report.code })),
  { key: "timmy_task", label: "Ermittlungsauftrag", code: "07" },
];

const tabs = [...riversideTabs, ...timmyTabs];

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

function SummaryTab() {
  return (
    <article className="document-page">
      <header className="document-heading">
        <p>Riverside Police Department · Case File</p>
        <h2>Case 81-F: Riverside Community Hall Fire</h2>
        <span>Classification: Evidence Review</span>
      </header>
      <div className="case-facts">
        <div><span>Date</span><strong>Thursday, 17 February</strong></div>
        <div><span>Alarm received</span><strong>6:47 p.m.</strong></div>
        <div><span>Location</span><strong>Riverside Community Hall</strong></div>
        <div><span>Suspected offence</span><strong>Deliberate fire-setting</strong></div>
      </div>
      <section className="reading-copy">
        <h3>Background</h3>
        <EvidenceParagraph id="summary-1">At 6:47 p.m. on Thursday, 17 February, the automatic fire alarm at Riverside Community Hall sent an emergency signal to the town fire brigade. The hall was closed to visitors, but several employees had been inside during the afternoon. Firefighters arrived at 6:53 p.m. and found smoke coming from a storage room at the eastern end of the building. They put out the fire before it reached the sports hall or the offices. No one was injured, but sports equipment, folding chairs and part of the storage-room wall were badly damaged.</EvidenceParagraph>
        <EvidenceParagraph id="summary-2">The police arrested the hall caretaker, Tomas Biro, two days later. Earlier on the day of the fire, Tomas had argued with the hall manager, Anna Varga. Two employees heard Anna tell him that she was tired of his complaints and that they would discuss his future on Monday. Tomas left the building at 6:31 p.m. His personal access card recorded his exit through the rear door. At 6:39 p.m., however, the same door was opened with a master maintenance card. That card was not assigned to one person. Tomas, Anna, the evening cleaner and an outside electrician had all used it during the previous month. It was normally kept on a hook in the manager’s office.</EvidenceParagraph>
        <EvidenceParagraph id="summary-3">Fire investigator Inspector David Novak concluded that the fire had been started deliberately. He believed that someone had entered through a broken window, switched off the alarm panel and used petrol to start the fire. He also believed that the master-card entry at 6:39 p.m. showed Tomas returning after he had appeared to leave. Tomas denies starting the fire. He says that he went directly to a bus stop after leaving the hall and returned only after Anna telephoned him to say that the building was burning.</EvidenceParagraph>
      </section>
      <footer className="page-stamp">FILE 81-F / PAGE 01</footer>
    </article>
  );
}

function BrigadeTab() {
  return (
    <article className="document-page">
      <header className="document-heading">
        <p>Riverside Fire Brigade · Incident Report</p>
        <h2>Initial Emergency Response</h2>
        <span>Filed by Captain Eva Horvath</span>
      </header>
      <section className="reading-copy">
        <EvidenceParagraph id="brigade-1">At 6:47 p.m., our control room received an automatic alarm from Riverside Community Hall. A neighbour also telephoned at 6:49 p.m. and reported dark smoke near the eastern end of the building. Our first vehicle arrived at 6:53 p.m. The main entrance was locked. Anna Varga, the hall manager, arrived at 6:55 p.m. with a key and opened it for us. We checked the main rooms and found no one inside. The eastern storage-room door was locked, but Ms Varga had a second key. When we opened it, thick smoke filled the corridor. The small eastern window was still closed and unbroken at that time. At 6:57 p.m., Firefighter Lantos broke that window from outside so that smoke could escape. Most of the broken glass therefore fell into the storage room. We then took a hose through the window while a second team entered through the corridor.</EvidenceParagraph>
        <EvidenceParagraph id="brigade-2">The main flames were extinguished by 7:01 p.m. To reach smaller areas that were still burning, we moved three large cardboard boxes, a metal shelf and several bags of sports clothing away from the rear wall. Some of these objects were carried into the corridor. Others were placed beside the broken window. Water from the hoses spread ash and small pieces of material across the floor. At 7:04 p.m., I switched off the alarm panel because its bell was making communication difficult and water had entered part of the electrical system. The panel was operating when we arrived and continued to sound until I switched it off. At 7:08 p.m., we placed a small petrol-powered generator beneath the eastern window because electricity to the building had been disconnected. A firefighter spilled a small amount of petrol while filling it. We covered the spill with absorbent powder, but a petrol smell remained around the window. Inspector David Novak arrived at approximately 7:36 p.m. The fire was already under control, the window had been broken, the alarm had been switched off and the generator was running.</EvidenceParagraph>
      </section>
      <footer className="page-stamp">FILE 81-F / REPORT 02</footer>
    </article>
  );
}

function InvestigatorTab() {
  return (
    <article className="document-page">
      <header className="document-heading">
        <p>Riverside Police Department · Fire Investigation</p>
        <h2>Inspector&apos;s Written Report</h2>
        <span>Filed by Inspector David Novak</span>
      </header>
      <section className="reading-copy">
        <EvidenceParagraph id="investigator-1">I arrived at Riverside Community Hall at approximately 7:36 p.m. Firefighters were still working near the eastern storage room. I observed a broken window in the eastern wall. A large quantity of glass lay inside the room, which was consistent with the window having been broken from outside. I also found that the fire-alarm panel was switched off. There was a clear smell of petrol near the broken window and across part of the wet floor. The greatest damage appeared along the rear wall, close to several cardboard boxes and an electrical extension cable. The hall manager informed me that there should not normally have been petrol inside the storage room. These observations suggested that a person had entered through the window, disabled the alarm and carried petrol to the area where the fire began.</EvidenceParagraph>
        <EvidenceParagraph id="investigator-2">The storage room had been changed during the emergency response. Firefighters had moved boxes, clothing bags and a metal shelf, and water had carried light material across the floor. For this reason, the exact earlier positions of loose objects could not be confirmed. However, in my opinion, the general pattern remained visible. A relatively clear path led from the broken window towards the damaged boxes near the rear wall. I therefore considered forced entry and deliberate fire-setting more likely than an electrical accident. Samples were taken from the floor and from two pieces of burned cardboard. The laboratory later found no petrol in those samples. This result did not completely exclude petrol because heat and water can remove small amounts of fuel, but it meant that the smell at the scene was the principal evidence that petrol had been present.</EvidenceParagraph>
        <EvidenceParagraph id="investigator-3">The building records showed that Tomas Biro left through the rear door at 6:31 p.m. using his personal card. The door was opened again at 6:39 p.m. with the master maintenance card. The system recorded the card but did not identify the person carrying it. Mr Biro knew the building, possessed keys during his work and understood the alarm system. He had also argued with the manager shortly before leaving. When I spoke to him outside the hall later that evening, his coat smelled of smoke. Taken together, these facts gave the police reasonable grounds to investigate him. I recommended that officers search his home, examine his clothing and determine whether he had used the master card after leaving the hall.</EvidenceParagraph>
      </section>
      <footer className="page-stamp">FILE 81-F / REPORT 03</footer>
    </article>
  );
}

function Exchange({ id, speaker, children }: { id: string; speaker: string; children: string }) {
  return <div className="testimony-block"><strong>{speaker}</strong><EvidenceParagraph id={id}>{children}</EvidenceParagraph></div>;
}

function CourtTab() {
  return (
    <article className="document-page">
      <header className="document-heading">
        <p>District Court · Hearing Transcript</p>
        <h2>Examination of Inspector Novak</h2>
        <span>Case 81-F · Evidence entered into record</span>
      </header>
      <section className="transcript-section">
        <h3>Examination by the Prosecutor</h3>
        <Exchange id="court-1" speaker="PROSECUTOR">Inspector Novak, please explain what you found when you examined Riverside Community Hall and why you believed that the fire had been started deliberately.</Exchange>
        <Exchange id="court-2" speaker="INSPECTOR NOVAK">When I arrived, the firefighters had controlled the main fire, so I could enter the eastern corridor safely. The storage room showed several signs that concerned me. First, its window was broken and most of the glass was lying inside. That normally suggests that the glass was struck from outside. Second, the alarm panel was switched off. A person who knew the building could have used the panel to delay a warning. Third, I noticed a strong petrol smell around the window and on part of the floor. The worst burning was farther inside, near cardboard boxes against the rear wall. To me, this suggested a possible route: someone entered through the window, moved across the room and started the fire near material that would burn easily. I knew that firefighters had moved some objects, but the broad pattern appeared clear. I also considered an electrical cause. There was a damaged extension cable near the rear wall, but damage to a cable does not show whether the cable caused the fire or was damaged by it. Considering the broken window, inactive alarm and petrol smell together, I believed deliberate fire-setting was the stronger explanation.</Exchange>
        <Exchange id="court-3" speaker="PROSECUTOR">Why did the investigation focus on Tomas Biro rather than another employee or an unknown person?</Exchange>
        <Exchange id="court-4" speaker="INSPECTOR NOVAK">Mr Biro had worked at the hall for six years. He knew which doors were usually locked, where keys were kept and how to operate the alarm panel. He had argued with Ms Varga that afternoon, and witnesses heard her say that they would discuss his future. His personal card showed him leaving at 6:31 p.m., but the rear door opened again eight minutes later with the master maintenance card. Someone familiar with the records might choose that card because it did not carry an individual name. Mr Biro had used it before. He also returned to the hall while firefighters were still present, and his coat smelled strongly of smoke when I spoke to him. None of these facts alone proved that he started the fire. Nevertheless, they formed a reasonable line of investigation: opportunity, knowledge of the building, a recent conflict and an entry that could not immediately be connected to another person. We searched his home but found no petrol container or burned clothing. His shoes carried ordinary street dirt, but no glass from the hall was found in them. Those negative results reduced the physical evidence against him, although they did not explain who used the master card.</Exchange>
      </section>
      <section className="transcript-section">
        <h3>Cross-Examination by the Defence</h3>
        <Exchange id="court-5" speaker="DEFENCE LAWYER">Please describe everything you knew about the condition of the storage room before you began drawing conclusions from it.</Exchange>
        <Exchange id="court-6" speaker="INSPECTOR NOVAK">I knew that a fire crew had entered before me and that water had been used. I could see that the floor was wet and that some boxes had been placed in the corridor. Captain Horvath told me that her team had moved objects to reach hot areas, although I did not receive her full written report until the following morning. At the time of my first examination, I did not know the original position of every box or bag. I photographed the room as I found it and marked the areas of greatest damage. I believed the main burn pattern on the rear wall would still be useful even if smaller objects had moved. My written report therefore stated both that the scene had been changed and that a general path from the window remained visible. The crew had carried boxes towards the corridor and had placed other objects beside the window. I cannot say whether the clear area on the floor existed before they entered. I also cannot say whether the damaged extension cable had originally been above, beneath or beside one of those boxes. That uncertainty is one reason I described my conclusion as an opinion rather than a proven fact.</Exchange>
        <Exchange id="court-7" speaker="DEFENCE LAWYER">Tell the court exactly what you learned about the alarm panel, including when you learned it.</Exchange>
        <Exchange id="court-8" speaker="INSPECTOR NOVAK">At 7:36 p.m., I saw that the alarm panel was switched off. I first considered the possibility that somebody had disabled it before starting the fire. The next morning, I read Captain Horvath&apos;s report. It stated that the automatic alarm reached the brigade at 6:47 p.m., that the bell was sounding when firefighters entered and that Captain Horvath switched the panel off at 7:04 p.m. I later confirmed those times with the brigade&apos;s control room. The alarm record was genuine; there was no sign that its time had been changed. It is possible for a person to interfere with one part of an alarm system while another part continues working, but I found no cut wire, removed battery or damaged control switch. My first report was written before I had received Captain Horvath&apos;s complete report. At that stage, I knew only that the panel was off when I examined it at 7:36 p.m.</Exchange>
        <Exchange id="court-9" speaker="DEFENCE LAWYER">Now explain the broken window and the petrol smell in the same way. What did you observe yourself, and what did you learn afterward?</Exchange>
        <Exchange id="court-10" speaker="INSPECTOR NOVAK">I personally observed a broken eastern window, glass on the storage-room floor and a petrol smell strongest near that window. I did not personally see anyone break the glass or carry petrol into the room. Captain Horvath&apos;s report says that the window was unbroken when the fire crew arrived and that Firefighter Lantos broke it from outside at 6:57 p.m. Most of the glass fell into the room. The report also says that a petrol-powered generator was placed directly beneath the window at 7:08 p.m. and that a small amount of petrol was spilled while it was being filled. The generator was still operating there when I arrived. During my first examination, I believed the smell also reached part of the floor inside. Water, open air and people moving through the area could have carried the smell. Laboratory tests later found no petrol in the floor or cardboard samples. I found no separate petrol container, fuel-soaked cloth or other object inside the room.</Exchange>
        <Exchange id="court-11" speaker="DEFENCE LAWYER">Finally, what does the electronic record tell us about the person who entered at 6:39 p.m., and what does it not tell us?</Exchange>
        <Exchange id="court-12" speaker="INSPECTOR NOVAK">The record shows that the rear door opened with the master maintenance card at 6:39 p.m. It does not contain a name, photograph or fingerprint. Four people had used that card during the previous month: Mr Biro, Ms Varga, the cleaner Marta Sipos and an electrician named Peter Fodor. The card was normally kept in the manager&apos;s office, but employees sometimes left that office unlocked while the hall was open. We did not recover clear fingerprints from the card because several people had handled it. Mr Biro&apos;s personal card proves that he left at 6:31 p.m.; it does not prove that he could not have returned with the master card. In the same way, the master-card entry does not prove that he was the person who returned. Ms Varga called him after the fire began and asked him to come back because he knew the building. The fire report records him arriving at approximately 7:18 p.m. and helping move chairs away from the corridor. I spoke to him after that work had taken place. I still considered him a possible suspect, but the electronic record and the smell of his clothing did not identify him by themselves.</Exchange>
      </section>
      <footer className="page-stamp">FILE 81-F / TRANSCRIPT 04</footer>
    </article>
  );
}

function TomasTab() {
  return (
    <article className="document-page">
      <header className="document-heading">
        <p>Riverside Police Department · Witness Statement</p>
        <h2>Statement of Tomas Biro</h2>
        <span>Statement supplied voluntarily</span>
      </header>
      <section className="reading-copy witness-copy">
        <EvidenceParagraph id="tomas-1">I did argue with Anna that afternoon, but the argument was about repairs. For three weeks I had been reporting that the electric heater in the meeting room switched itself off and that one extension cable became hot when too many things were connected to it. Anna said there was no money for an electrician and told me to stop complaining in front of visitors. She said we would discuss my future on Monday. I understood that she might give me a warning, but she did not dismiss me. At 6:25 p.m., she told me to finish for the day. I put my own keys in my pocket, used my personal card at the rear door at 6:31 and walked towards the number 8 bus stop. I remember seeing the master maintenance card on its hook when I passed the open office. I did not take it. The cleaner was still somewhere in the building when I left, and Anna had gone to collect papers from her car.</EvidenceParagraph>
        <EvidenceParagraph id="tomas-2">I reached the bus stop before the 6:38 bus, but I cannot prove whether I boarded that exact bus. The driver did not check names, and I paid with coins. I travelled two stops and entered a small grocery shop near my home. I did not keep the receipt because I bought only milk and soap. Anna telephoned me shortly after seven and said there was a fire. I returned on foot because it was faster than waiting for another bus. When I arrived, firefighters were moving chairs and sports bags away from the eastern corridor. Captain Horvath asked whether there were gas bottles or dangerous chemicals in the building. I told her that cleaning liquids were kept in a metal cupboard on the other side of the hall. I helped move chairs for several minutes and stood outside near the smoke while Anna spoke to the police. That is why my coat smelled of smoke. I do not know who used the master card. The cleaner, Anna and the electrician all knew where it was kept. I also do not know whether the hot extension cable had anything to do with the fire. I mentioned it because I had reported it before, not because I saw the fire begin.</EvidenceParagraph>
      </section>
      <div className="signature-line">Signed: <strong>Tomas Biro</strong></div>
      <footer className="page-stamp">FILE 81-F / STATEMENT 05</footer>
    </article>
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
        <span>6 Berichte · 4 mögliche Antworten · 1 Urteil</span>
      </header>
      <EvidenceParagraph id="timmy-task-intro" className="task-note">Lies alle sechs Berichte. Ordne die Ereignisse auf der Zeitleiste und vergleiche die Aussagen. Entscheide dann, wer das Restaurant wahrscheinlich angezündet hat. Eine verdächtige Person ist nicht automatisch der Täter.</EvidenceParagraph>
      <div className="suspect-strip"><span>NIEMAND — UNFALL</span><span>SAL DIMARCO</span><span>TIMMY BIANCHI</span><span>DIE MAFIA</span></div>
      <ol className="task-list">{timmyQuestions.map((question, index) => <li key={question}><span>{String(index + 1).padStart(2, "0")}</span><EvidenceParagraph id={`timmy-question-${index}`}>{question}</EvidenceParagraph></li>)}</ol>
      <div className="task-submit-panel">
        <div><span>LETZTER SCHRITT</span><strong>Bereit, den Fall abzuschließen?</strong><p>Gib dein Urteil ab und erkläre, welche Hinweise es stützen.</p></div>
        <button onClick={onSubmit}>FALL EINREICHEN →</button>
      </div>
      <footer className="page-stamp">TIMMY TWO-SHOES / AUFTRAG 07</footer>
    </article>
  );
}

const questions = [
  "Create a timeline beginning with Tomas leaving at 6:31 p.m. and ending with Inspector Novak arriving at 7:36 p.m. Include at least seven events.",
  "Inspector Novak originally relied on three main observations: the alarm panel, the broken window and the petrol smell. What did he observe in each case?",
  "What information in the fire brigade report provides a different explanation for each of those three observations?",
  "Which parts of the storage room had been changed before Inspector Novak examined it? Why does this matter?",
  "What can the 6:39 p.m. master-card record prove? What can it not prove?",
  "Give two facts that made Tomas a reasonable person to investigate. Then give two facts that weaken the case against him.",
  "Find one statement in Inspector Novak's written report that sounds more certain than his later answers in court. Explain the difference.",
  "Does Tomas's statement prove that he was somewhere else when the fire began? Explain why or why not.",
  "Which evidence remains useful even after the problems in the investigation are discovered?",
  "Imagine that you are responsible for continuing the investigation. Name three additional pieces of evidence you would try to find.",
  "Write a short judgment of 120–180 words. Has the evidence shown that Tomas started the fire, or is there still reasonable doubt? Use at least four specific facts from the documents.",
];

function TaskTab({ onSubmit }: { onSubmit: () => void }) {
  return (
    <article className="document-page">
      <header className="document-heading">
        <p>Special Investigations · Training Assignment</p>
        <h2>Your Evidence Review</h2>
        <span>Complete after reading all five case documents</span>
      </header>
      <p className="task-note">Read the case summary, both reports, the courtroom testimony and Tomas Biro&apos;s statement. You may return to the text and make notes. Answer in complete sentences when possible. Do not assume that a suspicious fact automatically proves guilt or innocence.</p>
      <ol className="task-list">{questions.map((question, index) => <li key={question}><span>{String(index + 1).padStart(2, "0")}</span><p>{question}</p></li>)}</ol>
      <div className="task-submit-panel">
        <div><span>FINAL STEP</span><strong>Ready to close the case?</strong><p>Record your conclusion and explain which evidence supports it.</p></div>
        <button onClick={onSubmit}>SUBMIT CASE →</button>
      </div>
      <footer className="page-stamp">FILE 81-F / ASSIGNMENT 06</footer>
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
  const verdictOptions: [Exclude<Verdict, "">, string][] = german ? [
    ["accident", "Niemand — es war ein Unfall"],
    ["sal", "Sal DiMarco"],
    ["timmy", "Timmy Bianchi"],
    ["mafia", "Die Mafia"],
  ] : [
    ["tomas", "Tomas Biro started the fire"],
    ["another", "Someone else started the fire"],
    ["accident", "The fire was accidental"],
    ["insufficient", "There is not enough evidence to decide"],
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
                  <button className="note-source" onClick={() => onOpenSource(note)}>↗ {(note.caseId ?? "riverside") === "timmy-two-shoes" ? "MPD-2026-1187" : "81-F"} · {note.sourceTitle ?? "Case file / Fallakte"}</button>
                ) : (
                  <b>{(note.caseId ?? "riverside") === "timmy-two-shoes" ? "MPD-2026-1187" : "81-F"} · Student-created note / Eigene Notiz</b>
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
  const [selectedCase, setSelectedCase] = useState<CaseId>("riverside");
  const [activeTab, setActiveTab] = useState<TabKey>("summary");
  const [visited, setVisited] = useState<Set<TabKey>>(new Set(["summary"]));
  const [submitOpen, setSubmitOpen] = useState(false);
  const [reports, setReports] = useState<Record<CaseId, CaseReportData>>(() => ({
    riverside: createEmptyReport(),
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
          riverside: parsed.riverside ?? createEmptyReport(),
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
      if (saved) setNotes((JSON.parse(saved) as CaseNote[]).map((note) => ({ ...note, caseId: note.caseId ?? "riverside" })));
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

  const currentTabs = selectedCase === "riverside" ? riversideTabs : timmyTabs;
  const currentVisited = currentTabs.filter((tab) => visited.has(tab.key)).length;
  const caseNotes = notes.filter((note) => (note.caseId ?? "riverside") === selectedCase);
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
    const firstTab: TabKey = caseId === "riverside" ? "summary" : "timmy_fire";
    setSelectedCase(caseId);
    setCaseOpen(true);
    setFolderOpen(false);
    setSubmitOpen(false);
    openTab(firstTab);
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
    const overlaps = notes.some((note) => (note.caseId ?? "riverside") === selectedCase && note.kind === "clip" && note.sourceBlock === selectionDraft.block &&
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
    setSelectedCase(note.caseId ?? "riverside");
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
            <div className="desktop-status"><span>2 cases assigned</span><span>Network: secure</span></div>

            {folderOpen && (
              <section className="file-window" aria-label="Case Files folder">
                <header className="window-titlebar"><span><FolderIcon small />CASE FILES</span><button onClick={() => { sfxClose(); setFolderOpen(false); }} aria-label="Close folder">×</button></header>
                <div className="window-toolbar"><span>ACTIVE INVESTIGATIONS</span><span>2 ITEMS</span></div>
                <div className="file-list">
                  <button className="case-file" onClick={() => openCase("riverside")}>
                    <span className="paper-file" aria-hidden="true">81-F</span>
                    <span><strong>Riverside Community Hall Fire</strong><small>Case 81-F · Evidence review · 6 documents</small></span>
                    <b aria-hidden="true">OPEN →</b>
                  </button>
                  <button className="case-file" onClick={() => openCase("timmy-two-shoes")}>
                    <span className="paper-file german-file" aria-hidden="true">TTS</span>
                    <span><strong>Der Brand in Timmy Two-Shoes&apos; Restaurant</strong><small>Aktenzeichen MPD-2026-1187 · Deutsch · 7 Dokumente</small></span>
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
              <div className="case-id-block"><span>{germanCase ? "AKTIVER FALL" : "ACTIVE CASE"}</span><strong>{germanCase ? "TTS" : "81-F"}</strong><p>{germanCase ? "Der Brand in Timmy Two-Shoes' Restaurant" : "Riverside Community Hall Fire"}</p></div>
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
                {activeTab === "summary" && <SummaryTab />}
                {activeTab === "brigade" && <BrigadeTab />}
                {activeTab === "investigator" && <InvestigatorTab />}
                {activeTab === "court" && <CourtTab />}
                {activeTab === "tomas" && <TomasTab />}
                {activeTab === "task" && <TaskTab onSubmit={() => setSubmitOpen(true)} />}
                {activeTab.startsWith("timmy_") && activeTab !== "timmy_task" && <TimmyReportTab reportKey={activeTab} />}
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
