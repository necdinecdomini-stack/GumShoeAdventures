import type { ReportCaseId } from "./case-report";

export type SuspectStatus = "unclear" | "suspected" | "excluded";

export type SuspectEvidence = {
  id: string;
  type: "incriminating" | "exonerating";
  text: string;
  source?: string;
};

export type SuspectData = {
  id: string;
  name: string;
  role: string;
  evidence: SuspectEvidence[];
  status: SuspectStatus;
};

export type CaseSuspects = Record<string, SuspectData>;

export type SuspectDefinition = {
  id: string;
  name: string;
  role: string;
};

export const caseSuspects: Record<ReportCaseId, SuspectDefinition[]> = {
  "timmy-two-shoes": [
    { id: "sal", name: "Sal Montenegro", role: "Co-owner, 40% — gambling debts, arson record" },
    { id: "timmy", name: "Timmy Bianchi", role: "Co-owner, 60% — hiding something" },
    { id: "mafia", name: "The Mafia", role: "Organised crime — protection racket" },
  ],
  "magyarosaurus": [
    { id: "tachkis", name: "Director Tachkis", role: "Museum Director — controlled access, records, delivery" },
    { id: "green", name: "Dr. Krisztina Green", role: "Palaeontologist — disputed ownership, original discoverer" },
    { id: "jameson", name: "James John Jameson", role: "Former Security Chief — dismissed, active account" },
  ],
  "broken-telescope": [
    { id: "stahl", name: "Dr. Heinrich Stahl", role: "Galaxy researcher — 20 years at observatory, difficult personality" },
    { id: "marek", name: "Dr. Viktor Marek", role: "Cepheid star researcher — most frequent victim of errors" },
    { id: "brenner", name: "Dr. Lukas Brenner", role: "Binary star researcher — falling behind, often at observatory" },
    { id: "zeller", name: "Dr. Katrin Zeller", role: "Lunar researcher — uses computer only, not the telescope" },
  ],
};

export function createEmptySuspects(caseId: ReportCaseId): CaseSuspects {
  const defs = caseSuspects[caseId] ?? [];
  const result: CaseSuspects = {};
  for (const def of defs) {
    result[def.id] = { id: def.id, name: def.name, role: def.role, evidence: [], status: "unclear" };
  }
  return result;
}

function SuspectIcon() {
  return <span className="suspect-icon" aria-hidden="true"><i /><i /><i /></span>;
}

export { SuspectIcon };

export default function SuspectsBoard({
  suspects,
  german,
  onUpdate,
  onClose,
}: {
  suspects: CaseSuspects;
  german: boolean;
  onUpdate: (suspects: CaseSuspects) => void;
  onClose: () => void;
}) {
  const suspectList = Object.values(suspects);

  const addEvidence = (suspectId: string, type: "incriminating" | "exonerating") => {
    const suspect = suspects[suspectId];
    if (!suspect) return;
    const newEvidence: SuspectEvidence = {
      id: window.crypto?.randomUUID?.() ?? `ev-${Date.now()}`,
      type,
      text: "",
    };
    onUpdate({
      ...suspects,
      [suspectId]: { ...suspect, evidence: [...suspect.evidence, newEvidence] },
    });
  };

  const updateEvidence = (suspectId: string, evidenceId: string, text: string) => {
    const suspect = suspects[suspectId];
    if (!suspect) return;
    onUpdate({
      ...suspects,
      [suspectId]: {
        ...suspect,
        evidence: suspect.evidence.map((e) => e.id === evidenceId ? { ...e, text } : e),
      },
    });
  };

  const deleteEvidence = (suspectId: string, evidenceId: string) => {
    const suspect = suspects[suspectId];
    if (!suspect) return;
    onUpdate({
      ...suspects,
      [suspectId]: {
        ...suspect,
        evidence: suspect.evidence.filter((e) => e.id !== evidenceId),
      },
    });
  };

  const setStatus = (suspectId: string, status: SuspectStatus) => {
    const suspect = suspects[suspectId];
    if (!suspect) return;
    onUpdate({
      ...suspects,
      [suspectId]: { ...suspect, status },
    });
  };

  const statusLabel = (status: SuspectStatus): string => {
    if (status === "suspected") return german ? "VERDÄCHTIG" : "SUSPECTED";
    if (status === "excluded") return german ? "AUSGESCHLOSSEN" : "EXCLUDED";
    return german ? "UNKLAR" : "UNCLEAR";
  };

  return (
    <section className="suspects-board" role="dialog" aria-modal="true" aria-labelledby="suspects-title">
      <header className="notes-board-bar suspects-board-bar">
        <div>
          <SuspectIcon />
          <span>
            <b id="suspects-title">{german ? "VERDÄCHTIGE" : "SUSPECTS"}</b>
            <small>{suspectList.length} {german ? "PERSONEN · AUF DIESEM GERÄT GESPEICHERT" : "PERSONS · SAVED ON THIS DEVICE"}</small>
          </span>
        </div>
        <div>
          <button className="close-notes-button" onClick={onClose} aria-label="Close suspects">×</button>
        </div>
      </header>
      <div className="suspects-canvas">
        {suspectList.map((suspect) => {
          const incriminating = suspect.evidence.filter((e) => e.type === "incriminating");
          const exonerating = suspect.evidence.filter((e) => e.type === "exonerating");
          return (
            <article className={`suspect-card status-${suspect.status}`} key={suspect.id}>
              <header className="suspect-card-header">
                <div className="suspect-identity">
                  <h3>{suspect.name}</h3>
                  <span>{suspect.role}</span>
                </div>
                <div className="suspect-status-controls">
                  {(["unclear", "suspected", "excluded"] as const).map((s) => (
                    <button
                      key={s}
                      className={`suspect-status-btn ${s}${suspect.status === s ? " active" : ""}`}
                      onClick={() => setStatus(suspect.id, s)}
                    >
                      {statusLabel(s)}
                    </button>
                  ))}
                </div>
              </header>
              <div className="suspect-evidence-columns">
                <div className="evidence-column incriminating">
                  <div className="evidence-column-header">
                    <span>{german ? "BELASTEND" : "INCRIMINATING"}</span>
                    <button onClick={() => addEvidence(suspect.id, "incriminating")}>＋</button>
                  </div>
                  {incriminating.map((e) => (
                    <div className="evidence-entry" key={e.id}>
                      <textarea
                        value={e.text}
                        onChange={(ev) => updateEvidence(suspect.id, e.id, ev.target.value)}
                        placeholder={german ? "Beweis eintragen…" : "Enter evidence…"}
                        rows={2}
                      />
                      {e.source && <span className="evidence-source">↗ {e.source}</span>}
                      <button className="evidence-delete" onClick={() => deleteEvidence(suspect.id, e.id)} aria-label="Delete evidence">×</button>
                    </div>
                  ))}
                  {!incriminating.length && (
                    <p className="evidence-empty">{german ? "Noch keine belastenden Beweise" : "No incriminating evidence yet"}</p>
                  )}
                </div>
                <div className="evidence-column exonerating">
                  <div className="evidence-column-header">
                    <span>{german ? "ENTLASTEND" : "EXONERATING"}</span>
                    <button onClick={() => addEvidence(suspect.id, "exonerating")}>＋</button>
                  </div>
                  {exonerating.map((e) => (
                    <div className="evidence-entry" key={e.id}>
                      <textarea
                        value={e.text}
                        onChange={(ev) => updateEvidence(suspect.id, e.id, ev.target.value)}
                        placeholder={german ? "Beweis eintragen…" : "Enter evidence…"}
                        rows={2}
                      />
                      {e.source && <span className="evidence-source">↗ {e.source}</span>}
                      <button className="evidence-delete" onClick={() => deleteEvidence(suspect.id, e.id)} aria-label="Delete evidence">×</button>
                    </div>
                  ))}
                  {!exonerating.length && (
                    <p className="evidence-empty">{german ? "Noch keine entlastenden Beweise" : "No exonerating evidence yet"}</p>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
