import type { ReportCaseId, CaseReportData } from "./case-report";
import type { CaseSuspects } from "./SuspectsBoard";

export type CaseId = ReportCaseId;
export type TimmyTabKey = "timmy_police" | "timmy_fire" | "timmy_insurance" | "timmy_sal" | "timmy_bianchi" | "timmy_agnes" | "timmy_tony" | "timmy_task";
export type MagyarTabKey = "magyar_police" | "magyar_security" | "magyar_acquisition" | "magyar_tachkis" | "magyar_green" | "magyar_lectures" | "magyar_jameson" | "magyar_personnel" | "magyar_voss" | "magyar_grissom" | "magyar_beggar";
export type TabKey = TimmyTabKey | MagyarTabKey;
export type Difficulty = "gumshoe" | "officer" | "lead-investigator";
export type NoteColor = "amber" | "blue" | "green" | "rose";

export type CaseNote = {
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
  linkedTo?: string[];
  disprovedBy?: string;
};

export type TimelineEvent = {
  id: string;
  caseId: CaseId;
  text: string;
  time: string;
  comment: string;
  sourceTab?: TabKey;
  sourceTitle?: string;
  sourceBlock?: string;
};

export type SelectionDraft = {
  text: string;
  tab: TabKey;
  block: string;
  start: number;
  end: number;
  x: number;
  y: number;
};

export type SaveSlot = {
  name: string;
  savedAt: string;
  language: "en" | "de";
  difficulty: Difficulty;
  selectedCase: CaseId;
  activeTab: TabKey;
  visited: TabKey[];
  readEmails: number[];
  notes: CaseNote[];
  timeline: TimelineEvent[];
  reports: Record<CaseId, CaseReportData>;
  allSuspects: Record<CaseId, CaseSuspects>;
};
