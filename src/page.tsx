import { useCallback, useEffect, useMemo, useState } from "react";
import { timmyReportsByDifficulty } from "./timmy-data";
import { magyarReportsByDifficulty } from "./magyarosaurus-data";
import { magyarReportsDeByDifficulty } from "./magyarosaurus-data-de";
import { getForDifficulty } from "./difficulty";
import { CaseReportApp, ReportIcon, createEmptyReport } from "./case-report";
import type { CaseReportData, ReportSource } from "./case-report";
import ComicIntro from "./ComicIntro";
import CityMap from "./CityMap";
import type { LocationId } from "./CityMap";
import SuspectsBoard, { SuspectIcon, createEmptySuspects, caseSuspects } from "./SuspectsBoard";
import type { CaseSuspects, SuspectEvidence } from "./SuspectsBoard";
import { toggleMute, isMuted, sfxClick, sfxOpen, sfxClose } from "./lib/audio";
import { HighlightsContext } from "./HighlightedText";
import { FolderIcon, SaveIcon, NotepadIcon, TimelineIcon, EmailIcon } from "./Icons";
import Journal, { JournalIcon } from "./Journal";
import { TimmyReportTab, MagyarReportTab, TimmyTaskTab } from "./ReportTabs";
import TimelineBoard from "./TimelineBoard";
import NotesBoard from "./NotesBoard";
import SaveDialog, { loadAllSaves, persistSaves } from "./SaveDialog";
import type { CaseId, Difficulty, TabKey, CaseNote, TimelineEvent, SelectionDraft, NoteColor, SaveSlot } from "./types";
import "./intro.css";

const firstTabForCase: Record<CaseId, TabKey> = {
  "timmy-two-shoes": "timmy_police",
  "magyarosaurus": "magyar_police",
};

const difficultyLabels: Record<Difficulty, { en: string; de: string }> = {
  "gumshoe": { en: "GUMSHOE", de: "SCHNÜFFLER" },
  "officer": { en: "OFFICER", de: "OFFICER" },
  "lead-investigator": { en: "LEAD INVESTIGATOR", de: "LEITENDER ERMITTLER" },
};

const noteColors: NoteColor[] = ["amber", "blue", "green", "rose"];

export default function Home() {
  const [view, setView] = useState<"intro" | "map" | "terminal" | LocationId>("intro");
  const [language, setLanguage] = useState<"en" | "de">("en");
  const [difficulty, setDifficulty] = useState<Difficulty>("officer");
  const [muted, setMuted] = useState(isMuted());
  const [textSize, setTextSize] = useState<number>(() => {
    try { return Number(localStorage.getItem("sid-text-size")) || 100; } catch { return 100; }
  });
  const changeTextSize = (delta: number) => {
    setTextSize(prev => {
      const next = Math.min(150, Math.max(80, prev + delta));
      try { localStorage.setItem("sid-text-size", String(next)); } catch {}
      return next;
    });
  };
  const [folderOpen, setFolderOpen] = useState(false);
  const [caseOpen, setCaseOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<CaseId>("timmy-two-shoes");
  const [activeTab, setActiveTab] = useState<TabKey>("timmy_police");
  const [visited, setVisited] = useState<Set<TabKey>>(new Set(["timmy_police"]));
  const [submitOpen, setSubmitOpen] = useState(false);
  const [reports, setReports] = useState<Record<CaseId, CaseReportData>>(() => ({
    "timmy-two-shoes": createEmptyReport(),
    "magyarosaurus": createEmptyReport(),
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
  const [emailOpen, setEmailOpen] = useState(false);
  const [activeEmail, setActiveEmail] = useState<number | null>(null);
  const [readEmails, setReadEmails] = useState<Set<number>>(new Set());
  const [suspectsOpen, setSuspectsOpen] = useState(false);
  const [allSuspects, setAllSuspects] = useState<Record<CaseId, CaseSuspects>>(() => ({
    "timmy-two-shoes": createEmptySuspects("timmy-two-shoes"),
    "magyarosaurus": createEmptySuspects("magyarosaurus"),
  }));
  const [suspectsLoaded, setSuspectsLoaded] = useState(false);
  const [suspectPicker, setSuspectPicker] = useState<{ text: string; tab: TabKey; source: string; x: number; y: number } | null>(null);
  const [journalOpen, setJournalOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [saveSlots, setSaveSlots] = useState<(SaveSlot | null)[]>(() => loadAllSaves());
  const [saveToast, setSaveToast] = useState("");
  const [confirmOverwrite, setConfirmOverwrite] = useState<number | null>(null);
  const [confirmLoad, setConfirmLoad] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const timmyTabs = useMemo(() => {
    const reports = getForDifficulty(timmyReportsByDifficulty, difficulty);
    return [
      ...reports.map((report) => ({ key: report.key as TabKey, label: report.label, code: report.code })),
      { key: "timmy_task" as TabKey, label: "Ermittlungsauftrag", code: "08" },
    ];
  }, [difficulty]);

  const magyarTabsEn = useMemo(() => {
    const reports = getForDifficulty(magyarReportsByDifficulty, difficulty);
    return reports.map((report) => ({ key: report.key as TabKey, label: report.label, code: report.code }));
  }, [difficulty]);

  const magyarTabsDe = useMemo(() => {
    const reports = getForDifficulty(magyarReportsDeByDifficulty, difficulty);
    return reports.map((report) => ({ key: report.key as TabKey, label: report.label, code: report.code }));
  }, [difficulty]);

  const buildSaveSlot = useCallback((name: string): SaveSlot => ({
    name,
    savedAt: new Date().toISOString(),
    language,
    difficulty,
    selectedCase,
    activeTab,
    visited: [...visited],
    readEmails: [...readEmails],
    notes,
    timeline,
    reports,
    allSuspects,
  }), [language, difficulty, selectedCase, activeTab, visited, readEmails, notes, timeline, reports, allSuspects]);

  const saveToSlot = useCallback((index: number) => {
    const slot = buildSaveSlot(`Save ${index + 1}`);
    setSaveSlots((current) => {
      const next = [...current];
      next[index] = slot;
      persistSaves(next);
      return next;
    });
    setSaveToast("Game saved.");
    setConfirmOverwrite(null);
  }, [buildSaveSlot]);

  const loadFromSlot = useCallback((index: number) => {
    const slot = saveSlots[index];
    if (!slot) return;
    setLanguage(slot.language);
    setDifficulty(slot.difficulty ?? "officer");
    setSelectedCase(slot.selectedCase);
    setActiveTab(slot.activeTab);
    setVisited(new Set(slot.visited));
    setReadEmails(new Set(slot.readEmails));
    setNotes(slot.notes);
    setTimeline(slot.timeline);
    setReports(slot.reports);
    setAllSuspects(slot.allSuspects);
    setReportsLoaded(true);
    setNotesLoaded(true);
    setTimelineLoaded(true);
    setSuspectsLoaded(true);
    setSaveOpen(false);
    setConfirmLoad(null);
    setCaseOpen(false);
    setFolderOpen(false);
    setSaveToast("Game loaded.");
  }, [saveSlots]);

  const deleteSlot = useCallback((index: number) => {
    setSaveSlots((current) => {
      const next = [...current];
      next[index] = null;
      persistSaves(next);
      return next;
    });
    setConfirmDelete(null);
    setSaveToast("Save deleted.");
  }, []);

  const exportSave = useCallback(() => {
    const slot = buildSaveSlot("Export");
    const json = JSON.stringify(slot, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SID-save-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setSaveToast("Save exported to file.");
  }, [buildSaveSlot]);

  const importSave = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const slot = JSON.parse(reader.result as string) as SaveSlot;
          if (!slot.notes || !slot.reports || !slot.allSuspects) {
            setSaveToast("Invalid save file.");
            return;
          }
          setLanguage(slot.language ?? "en");
          setSelectedCase(slot.selectedCase ?? "timmy-two-shoes");
          setActiveTab(slot.activeTab ?? "timmy_police");
          setVisited(new Set(slot.visited ?? ["timmy_police"]));
          setReadEmails(new Set(slot.readEmails ?? []));
          setNotes(slot.notes);
          setTimeline(slot.timeline ?? []);
          setReports(slot.reports);
          setAllSuspects(slot.allSuspects);
          setReportsLoaded(true);
          setNotesLoaded(true);
          setTimelineLoaded(true);
          setSuspectsLoaded(true);
          setSaveOpen(false);
          setCaseOpen(false);
          setFolderOpen(false);
          setSaveToast("Save imported successfully.");
        } catch {
          setSaveToast("Could not read save file.");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }, []);

  useEffect(() => {
    if (!saveToast) return;
    const timer = window.setTimeout(() => setSaveToast(""), 2500);
    return () => window.clearTimeout(timer);
  }, [saveToast]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("special-investigations-case-reports-v2");
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<Record<CaseId, CaseReportData>>;
        setReports({
          "timmy-two-shoes": parsed["timmy-two-shoes"] ?? createEmptyReport(),
          "magyarosaurus": parsed["magyarosaurus"] ?? createEmptyReport(),
        });
      }
    } catch {
    } finally {
      setReportsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!reportsLoaded) return;
    try {
      window.localStorage.setItem("special-investigations-case-reports-v2", JSON.stringify(reports));
    } catch {
    }
  }, [reports, reportsLoaded]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("case-81-f-notes-v1");
      if (saved) setNotes((JSON.parse(saved) as CaseNote[]).map((note) => ({ ...note, caseId: "timmy-two-shoes" as CaseId })));
    } catch {
    } finally {
      setNotesLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!notesLoaded) return;
    try {
      window.localStorage.setItem("case-81-f-notes-v1", JSON.stringify(notes));
    } catch {
    }
  }, [notes, notesLoaded]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("special-investigations-timeline-v1");
      if (saved) setTimeline(JSON.parse(saved) as TimelineEvent[]);
    } catch {
    } finally {
      setTimelineLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!timelineLoaded) return;
    try {
      window.localStorage.setItem("special-investigations-timeline-v1", JSON.stringify(timeline));
    } catch {
    }
  }, [timeline, timelineLoaded]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("special-investigations-suspects-v1");
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<Record<CaseId, CaseSuspects>>;
        setAllSuspects({
          "timmy-two-shoes": parsed["timmy-two-shoes"] ?? createEmptySuspects("timmy-two-shoes"),
          "magyarosaurus": parsed["magyarosaurus"] ?? createEmptySuspects("magyarosaurus"),
        });
      }
    } catch {
    } finally {
      setSuspectsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!suspectsLoaded) return;
    try {
      window.localStorage.setItem("special-investigations-suspects-v1", JSON.stringify(allSuspects));
    } catch {
    }
  }, [allSuspects, suspectsLoaded]);

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
    return <ComicIntro onComplete={(lang, diff) => { setLanguage(lang); setDifficulty(diff); setView("terminal"); }} />;
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

  const magyarTabs = language === "de" ? magyarTabsDe : magyarTabsEn;
  const allTabs = [...timmyTabs, ...magyarTabs];
  const currentTabs = selectedCase === "magyarosaurus" ? magyarTabs : timmyTabs;
  const currentVisited = currentTabs.filter((tab) => visited.has(tab.key)).length;
  const caseNotes = notes.filter((note) => (note.caseId ?? "timmy-two-shoes") === selectedCase);
  const caseTimeline = timeline.filter((event) => event.caseId === selectedCase);
  const currentReport = reports[selectedCase];
  const submitted = currentReport.submitted;
  const currentSuspects = allSuspects[selectedCase] ?? createEmptySuspects(selectedCase);
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
    ...Object.values(currentSuspects).flatMap((suspect) =>
      suspect.evidence.filter((e) => e.text.trim()).map((e) => ({
        id: `suspect-${suspect.id}-${e.id}`,
        kind: "suspect" as const,
        title: `${suspect.name} — ${e.type === "incriminating" ? "Incriminating" : "Exonerating"}`,
        text: e.text,
        comment: e.source ?? "",
      }))
    ),
  ];
  const germanCase = selectedCase === "timmy-two-shoes" || (selectedCase === "magyarosaurus" && language === "de");
  const activeTitle = allTabs.find((tab) => tab.key === activeTab)?.label ?? "Case file";

  const openCase = (caseId: CaseId) => {
    setSelectedCase(caseId);
    setCaseOpen(true);
    setFolderOpen(false);
    setSubmitOpen(false);
    openTab(firstTabForCase[caseId]);
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
      sourceTitle: allTabs.find((tab) => tab.key === selectionDraft.tab)?.label ?? "Case file",
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
      sourceTitle: allTabs.find((tab) => tab.key === selectionDraft.tab)?.label ?? "Case file",
      sourceBlock: selectionDraft.block,
    }]);
    setSelectionDraft(null);
    setNoteToast(germanCase ? "Ereignis zur Zeitleiste hinzugefügt." : "Event added to the case timeline.");
    window.getSelection()?.removeAllRanges();
  };

  const flagToSuspect = (suspectId: string, type: "incriminating" | "exonerating") => {
    if (!suspectPicker) return;
    const suspects = allSuspects[selectedCase] ?? createEmptySuspects(selectedCase);
    const suspect = suspects[suspectId];
    if (!suspect) return;
    const newEvidence: SuspectEvidence = {
      id: window.crypto?.randomUUID?.() ?? `ev-${Date.now()}`,
      type,
      text: suspectPicker.text,
      source: suspectPicker.source,
    };
    setAllSuspects((current) => ({
      ...current,
      [selectedCase]: {
        ...suspects,
        [suspectId]: { ...suspect, evidence: [...suspect.evidence, newEvidence] },
      },
    }));
    setSuspectPicker(null);
    setSelectionDraft(null);
    setNoteToast(germanCase ? "Beweis dem Verdächtigen zugeordnet." : "Evidence linked to suspect.");
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
      <section className="terminal-shell" style={{ "--text-scale": textSize / 100 } as React.CSSProperties}>
        <header className="system-bar">
          <div className="system-name"><button className="back-to-map-header" onClick={() => { sfxClick(); setView("map"); }} aria-label="Back to city map">← MAP</button><span className="status-light" />RPD EVIDENCE NETWORK</div>
          <div className="system-actions"><span>TERMINAL 04</span><div className="text-size-controls"><button className="text-size-btn" onClick={() => { changeTextSize(-10); sfxClick(); }} disabled={textSize <= 80} aria-label="Decrease text size">-</button><span className="text-size-label">{textSize}%</span><button className="text-size-btn" onClick={() => { changeTextSize(10); sfxClick(); }} disabled={textSize >= 150} aria-label="Increase text size">+</button></div><button className="sound-toggle" onClick={() => { setMuted(toggleMute()); sfxClick(); }} aria-label={muted ? "Unmute" : "Mute"}>{muted ? "\u{1F507}" : "\u{1F50A}"}</button></div>
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
            <button className="folder-button email-desktop-button" onClick={() => { sfxOpen(); setEmailOpen(true); }} aria-label="Open email">
              <EmailIcon />
              <span>E-MAIL</span>
              {2 - readEmails.size > 0 && <b>{2 - readEmails.size}</b>}
            </button>
            <button className="folder-button files-desktop-button" onClick={() => { sfxOpen(); setFolderOpen(true); }} aria-label="Open Case Files folder">
              <FolderIcon />
              <span>CASE FILES</span>
            </button>
            <button className="folder-button suspects-desktop-button" onClick={() => { sfxOpen(); setSuspectsOpen(true); }} aria-label="Open suspects board">
              <SuspectIcon />
              <span>SUSPECTS</span>
            </button>
            <button className="folder-button timeline-desktop-button" onClick={() => { sfxOpen(); setTimelineOpen(true); }} aria-label="Open case timeline">
              <TimelineIcon />
              <span>TIMELINE</span>
              {caseTimeline.length > 0 && <b>{caseTimeline.length}</b>}
            </button>
            <button className="folder-button notes-desktop-button" onClick={() => { sfxOpen(); setNotesOpen(true); }} aria-label="Open Bones' Notes">
              <NotepadIcon />
              <span>BONES&apos; NOTES</span>
              {caseNotes.length > 0 && <b>{caseNotes.length}</b>}
            </button>
            <button className="folder-button report-desktop-button" onClick={() => { sfxOpen(); setSubmitOpen(true); }} aria-label="Open case report">
              <ReportIcon />
              <span>FINAL REPORT<br />ABSCHLUSSBERICHT</span>
            </button>
            <button className="folder-button journal-desktop-button" onClick={() => { sfxOpen(); setJournalOpen(true); }} aria-label="Open Bones' Journal">
              <JournalIcon />
              <span>BONES&apos; JOURNAL</span>
            </button>
            <button className="folder-button save-desktop-button" onClick={() => { sfxOpen(); setSaveOpen(true); }} aria-label="Save or load game">
              <SaveIcon />
              <span>SAVE / LOAD</span>
            </button>
            <div className="desktop-status"><span>2 cases assigned</span><span className="rank-badge">{language === "de" ? "RANG" : "RANK"}: {difficultyLabels[difficulty][language]}</span><span>Network: secure</span></div>

            {folderOpen && (
              <section className="file-window" aria-label="Case Files folder">
                <header className="window-titlebar"><span><FolderIcon small />CASE FILES</span><button onClick={() => { sfxClose(); setFolderOpen(false); }} aria-label="Close folder">×</button></header>
                <div className="window-toolbar"><span>ACTIVE INVESTIGATIONS</span><span>2 ITEMS</span></div>
                <div className="file-list">
                  <button className="case-file" onClick={() => openCase("magyarosaurus")}>
                    <span className={language === "de" ? "paper-file german-file" : "paper-file"} aria-hidden="true">MDC</span>
                    <span><strong>{language === "de" ? "Der verschwundene Magyarosaurus" : "The Missing Magyarosaurus"}</strong><small>{language === "de" ? "Aktenzeichen SID-2026-0002 · Deutsch · 11 Dokumente" : "Case SID-2026-0002 · English · 11 Documents"}</small></span>
                    <b aria-hidden="true">{language === "de" ? "ÖFFNEN →" : "OPEN →"}</b>
                  </button>
                  <button className="case-file" onClick={() => openCase("timmy-two-shoes")}>
                    <span className="paper-file german-file" aria-hidden="true">TTS</span>
                    <span><strong>Der Brand in Timmy Two-Shoes&apos; Restaurant</strong><small>Aktenzeichen NPD-2026-1187 · Deutsch · 7 Dokumente</small></span>
                    <b aria-hidden="true">ÖFFNEN →</b>
                  </button>
                </div>
              </section>
            )}

            {emailOpen && (
              <section className="email-window" role="dialog" aria-modal="true" aria-label="Email">
                <header className="window-titlebar"><span><EmailIcon />E-MAIL</span><button onClick={() => { sfxClose(); setEmailOpen(false); setActiveEmail(null); }} aria-label="Close email">×</button></header>
                <div className="window-toolbar"><span>INBOX</span><span>2 MESSAGES</span></div>
                {activeEmail === null ? (
                  <div className="email-inbox">
                    <button className={`email-row${readEmails.has(1) ? " read" : ""}`} onClick={() => { setActiveEmail(1); setReadEmails((prev) => new Set(prev).add(1)); }}>
                      <span className="email-row-from">Chief Nymos</span>
                      <span className="email-row-subject">New case — Missing Magyarosaurus</span>
                      <span className="email-row-date">Jun 25</span>
                    </button>
                    <button className={`email-row${readEmails.has(0) ? " read" : ""}`} onClick={() => { setActiveEmail(0); setReadEmails((prev) => new Set(prev).add(0)); }}>
                      <span className="email-row-from">Chief Nymos</span>
                      <span className="email-row-subject">Update from Japan — Report language change</span>
                      <span className="email-row-date">Jun 20</span>
                    </button>
                  </div>
                ) : activeEmail === 0 ? (
                  <div className="email-body">
                    <button className="email-back" onClick={() => setActiveEmail(null)}>← INBOX</button>
                    <div className="email-header">
                      <div className="email-field"><span className="email-label">FROM:</span><span>Chief Nymos &lt;nemo@rpd.neuheim.gov&gt;</span></div>
                      <div className="email-field"><span className="email-label">TO:</span><span>Det. &quot;Bones&quot; Malone &lt;bones@rpd.neuheim.gov&gt;</span></div>
                      <div className="email-field"><span className="email-label">DATE:</span><span>June 20, 2026 — 03:14 AM JST</span></div>
                      <div className="email-field"><span className="email-label">SUBJECT:</span><span className="email-subject">Update from Japan — Report language change</span></div>
                    </div>
                    <div className="email-content">
                      <p>Hello Bones,</p>
                      <p>We&apos;re still in Japan. As you can see, the Chief is having the time of his life though the number of Kaiju emerging from the ocean is... problematic. Still, it&apos;s only a matter of time before we wrap this up too.</p>
                      <p>Small wrinkle, the Chief has been exposed to a BIT of radiation and... well... he&apos;s lost his grasp on every other language.</p>
                      <p>So... until we figure out how to reverse the damage any reports you submit are going to have to be in English.</p>
                      <p>Cheers.</p>
                      <div className="email-attachment">
                        <div className="email-attachment-label">📎 ATTACHMENT: Chief_In_Japan.png</div>
                        <img src="./email/chief-japan.png" alt="The Chief in Japan, fighting Kaiju alongside a giant mech" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="email-body">
                    <button className="email-back" onClick={() => setActiveEmail(null)}>← INBOX</button>
                    <div className="email-header">
                      <div className="email-field"><span className="email-label">FROM:</span><span>Chief Nymos &lt;nemo@rpd.neuheim.gov&gt;</span></div>
                      <div className="email-field"><span className="email-label">TO:</span><span>Det. &quot;Bones&quot; Malone &lt;bones@rpd.neuheim.gov&gt;</span></div>
                      <div className="email-field"><span className="email-label">DATE:</span><span>June 25, 2026 — 11:42 PM JST</span></div>
                      <div className="email-field"><span className="email-label">SUBJECT:</span><span className="email-subject">New case — Missing Magyarosaurus</span></div>
                    </div>
                    <div className="email-content">
                      <p>Hello Bones.</p>
                      <p>We have something new.</p>
                      <p>But first. Look at this! What a massive radioactive beastie.</p>
                      <p>You. My friend. Are also going to be looking into beasties. Specifically the kind that went extinct 66 Million Years Ago. A Magyarosaurus vanished from the Natural History Museum. If it walked off. Call me and I&apos;ll help you hunt the zombie dino. If someone helped it walk off. Find out who.</p>
                      <p>— The Chief.</p>
                      <div className="email-attachment">
                        <div className="email-attachment-label">📎 ATTACHMENT: Chief_Radioactive_Beastie.png</div>
                        <img src="./email/chief-case2.png" alt="The Chief standing triumphantly on a captured radioactive beast" />
                      </div>
                    </div>
                  </div>
                )}
              </section>
            )}

            {saveOpen && (
              <SaveDialog
                slots={saveSlots}
                onSave={saveToSlot}
                onLoad={loadFromSlot}
                onDelete={deleteSlot}
                onExport={exportSave}
                onImport={importSave}
                onClose={() => { sfxClose(); setSaveOpen(false); setConfirmOverwrite(null); setConfirmLoad(null); setConfirmDelete(null); }}
                confirmOverwrite={confirmOverwrite}
                confirmLoad={confirmLoad}
                confirmDelete={confirmDelete}
                setConfirmOverwrite={setConfirmOverwrite}
                setConfirmLoad={setConfirmLoad}
                setConfirmDelete={setConfirmDelete}
              />
            )}
          </div>
        ) : (
          <div className="case-reader">
            <header className="case-reader-titlebar"><span><FolderIcon small />CASE FILES</span><button onClick={() => { sfxClose(); setCaseOpen(false); }} aria-label="Close case files">×</button></header>
            <aside className="case-sidebar">
              <div className="case-id-block"><span>{germanCase ? "AKTIVER FALL" : "ACTIVE CASE"}</span><strong>{selectedCase === "magyarosaurus" ? "MDC" : "TTS"}</strong><p>{selectedCase === "magyarosaurus" ? (language === "de" ? "Der verschwundene Magyarosaurus" : "The Missing Magyarosaurus") : "Der Brand in Timmy Two-Shoes' Restaurant"}</p></div>
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
                <button className="open-notes-button open-suspects-button" onClick={() => setSuspectsOpen(true)}><SuspectIcon /><b>{germanCase ? "VERDÄCHTIGE" : "SUSPECTS"}</b><span>{Object.keys(currentSuspects).length}</span></button>
              </div>
              <button className={submitted ? "submit-case-button submitted" : "submit-case-button"} onClick={() => setSubmitOpen(true)}><span>{submitted ? "✓" : "↗"}</span><b>{submitted ? "REPORT SUBMITTED / BERICHT EINGEREICHT" : "CASE REPORT / ABSCHLUSSBERICHT"}</b></button>
              <div className="review-meter"><span>{germanCase ? "DOKUMENTE GELESEN" : "DOCUMENTS REVIEWED"}</span><div><i style={{ width: `${(currentVisited / currentTabs.length) * 100}%` }} /></div><b>{currentVisited} / {currentTabs.length}</b></div>
            </aside>
            <section className="document-view">
              <div className="document-toolbar"><span>{activeTitle}</span><span>SELECT TEXT TO FLAG</span></div>
              <div className="document-scroll" onMouseUp={captureSelection} onTouchEnd={() => window.setTimeout(captureSelection, 0)}>
                {activeTab.startsWith("timmy_") && activeTab !== "timmy_task" && <TimmyReportTab reportKey={activeTab} difficulty={difficulty} />}
                {activeTab === "timmy_task" && <TimmyTaskTab onSubmit={() => setSubmitOpen(true)} difficulty={difficulty} />}
                {activeTab.startsWith("magyar_") && <MagyarReportTab reportKey={activeTab} lang={language} difficulty={difficulty} />}
              </div>
            </section>
          </div>
        )}
        </HighlightsContext.Provider>
        {selectionDraft && (
          <div className="selection-tool" style={{ left: selectionDraft.x, top: selectionDraft.y }}>
            <button onClick={flagSelection}>⚑ {germanCase ? "ZU NOTIZEN" : "FLAG TO NOTES"}</button><button onClick={addSelectionToTimeline}>≡ {germanCase ? "ZUR ZEITLEISTE" : "ADD TO TIMELINE"}</button><button className="suspect-flag-btn" onClick={() => { setSuspectPicker({ text: selectionDraft.text, tab: selectionDraft.tab, source: allTabs.find((t) => t.key === selectionDraft.tab)?.label ?? "Case file", x: selectionDraft.x, y: selectionDraft.y + 40 }); }}>⊕ {germanCase ? "VERDÄCHTIGEM" : "TO SUSPECT"}</button><button onClick={() => { setSelectionDraft(null); window.getSelection()?.removeAllRanges(); }} aria-label="Dismiss selection tool">×</button>
          </div>
        )}
        {noteToast && <div className="note-toast" role="status">{noteToast}</div>}
        {saveToast && <div className="note-toast" role="status">{saveToast}</div>}
        {suspectPicker && (
          <div className="suspect-picker" style={{ left: suspectPicker.x, top: suspectPicker.y }}>
            <div className="suspect-picker-header"><span>{germanCase ? "VERDÄCHTIGEM ZUORDNEN" : "LINK TO SUSPECT"}</span><button onClick={() => setSuspectPicker(null)}>×</button></div>
            <div className="suspect-picker-list">
              {(caseSuspects[selectedCase] ?? []).map((def) => (
                <div key={def.id} style={{ display: "flex", alignItems: "center", borderBottom: "1px solid rgba(119,200,192,.08)" }}>
                  <span style={{ flex: 1, padding: ".6rem .7rem", color: "#d3e4e1", font: '.72rem "Courier New", monospace' }}>{def.name}</span>
                  <div className="picker-type">
                    <button className="incr" onClick={() => flagToSuspect(def.id, "incriminating")}>⊕</button>
                    <button className="exon" onClick={() => flagToSuspect(def.id, "exonerating")}>⊖</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {notesOpen && <NotesBoard notes={caseNotes} german={germanCase} onAdd={addBlankNote} onUpdate={updateNote} onDelete={(id) => setNotes((current) => current.filter((note) => note.id !== id))} onOpenSource={openNoteSource} onClose={() => setNotesOpen(false)} />}
        {timelineOpen && <TimelineBoard events={caseTimeline} german={germanCase} onAdd={addBlankTimelineEvent} onUpdate={updateTimelineEvent} onDelete={(id) => setTimeline((current) => current.filter((event) => event.id !== id))} onMove={moveTimelineEvent} onOpenSource={openTimelineSource} onClose={() => setTimelineOpen(false)} />}
        {suspectsOpen && <SuspectsBoard suspects={currentSuspects} german={germanCase} onUpdate={(updated) => setAllSuspects((current) => ({ ...current, [selectedCase]: updated }))} onClose={() => setSuspectsOpen(false)} />}
        {submitOpen && <CaseReportApp caseId={selectedCase} report={currentReport} sources={reportSources} reviewed={currentVisited} total={currentTabs.length} onCaseChange={setSelectedCase} onChange={(report) => setReports((current) => ({ ...current, [selectedCase]: report }))} onClose={() => setSubmitOpen(false)} />}
        {journalOpen && <Journal onClose={() => { sfxClose(); setJournalOpen(false); }} difficulty={difficulty} />}
      </section>
    </main>
  );
}
