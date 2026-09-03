import { useCallback, useEffect, useRef, useState } from "react";
import { initAudio, startMusic, stopMusic, sfxClick, sfxPageTurn, sfxWhoosh, playSfxFile } from "./lib/audio";
import type { SfxHandle } from "./lib/audio";
import type { Difficulty } from "./types";

const PAGES = Array.from({ length: 18 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return `./comic/page_${n}.webp`;
});

const AUDIO_FILES = [
  "./audio/rain-thunder.mp3",
  "./audio/whistle.mp3",
  "./audio/footsteps.mp3",
  "./audio/phone-ring.mp3",
  "./audio/easy-winners.mp3",
  "./audio/car-driving.mp3",
];

const TOTAL_ASSETS = PAGES.length + AUDIO_FILES.length;

type Phase = "loading" | "splash" | "comic" | "difficulty" | "done";

function useAssetLoader() {
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    let count = 0;
    const tick = () => {
      count++;
      setLoaded(count);
      if (count >= TOTAL_ASSETS) setReady(true);
    };

    PAGES.forEach((src) => {
      const img = new Image();
      img.onload = tick;
      img.onerror = tick;
      img.src = src;
    });

    AUDIO_FILES.forEach((src) => {
      fetch(src)
        .then((r) => r.arrayBuffer())
        .then(() => tick())
        .catch(() => tick());
    });
  }, []);

  return { loaded, ready, total: TOTAL_ASSETS };
}

export default function ComicIntro({ onComplete }: { onComplete: (language: "en" | "de", difficulty: Difficulty) => void }) {
  const { loaded, ready, total } = useAssetLoader();
  const [phase, setPhase] = useState<Phase>("loading");
  const [page, setPage] = useState(0);
  const [fading, setFading] = useState(false);
  const transitioning = useRef(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const pageSfxHandles = useRef<SfxHandle[]>([]);
  const ragtime = useRef<SfxHandle | null>(null);
  const chosenLang = useRef<"en" | "de">("en");

  useEffect(() => {
    if (ready && phase === "loading") {
      setTimeout(() => setPhase("splash"), 400);
    }
  }, [ready, phase]);

  const stopPageSfx = () => {
    pageSfxHandles.current.forEach((h) => h.stop());
    pageSfxHandles.current = [];
  };

  useEffect(() => {
    if (phase !== "comic") return;

    if (pageSfxHandles.current.length && page !== 11 && page !== 12) {
      stopPageSfx();
    }

    if (page === 2) {
      playSfxFile("./audio/whistle.mp3");
      playSfxFile("./audio/footsteps.mp3");
    } else if (page === 6) {
      playSfxFile("./audio/phone-ring.mp3", true).then((h) => {
        pageSfxHandles.current.push(h);
      });
    } else if (page === 10) {
      playSfxFile("./audio/easy-winners.mp3").then((h) => {
        ragtime.current = h;
      });
    } else if (page === 11) {
      playSfxFile("./audio/car-driving.mp3", true).then((h) => {
        pageSfxHandles.current.push(h);
      });
    }
  }, [page, phase]);

  const startComic = useCallback(() => {
    initAudio();
    sfxClick();
    startMusic("./audio/rain-thunder.mp3");
    setFading(true);
    setTimeout(() => {
      setPhase("comic");
      setFading(false);
    }, 600);
  }, []);

  const endIntro = useCallback(() => {
    if (phase === "done" || phase === "difficulty") return;
    setFading(true);
    stopPageSfx();
    ragtime.current?.fadeOut(3);
    ragtime.current = null;
    stopMusic();
    setTimeout(() => {
      setPhase("difficulty");
      setFading(false);
    }, 800);
  }, [phase]);

  const selectDifficulty = useCallback((diff: Difficulty) => {
    sfxClick();
    setPhase("done");
    setFading(true);
    setTimeout(() => onComplete(chosenLang.current, diff), 1000);
  }, [onComplete]);

  const nextPage = useCallback(() => {
    if (transitioning.current) return;
    if (page >= PAGES.length - 1) {
      endIntro();
      return;
    }
    transitioning.current = true;
    sfxPageTurn();
    setPage((p) => p + 1);
    setTimeout(() => {
      transitioning.current = false;
    }, 500);
  }, [page, endIntro]);

  useEffect(() => {
    if (phase !== "comic") return;
    const handler = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        nextPage();
      }
      if (e.key === "Escape") {
        endIntro();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, nextPage, endIntro]);

  if (phase === "done") {
    return (
      <div id="intro" className={fading ? "fade-out" : ""} />
    );
  }

  return (
    <div id="intro">
      {phase === "loading" && (
        <div className="loading-screen">
          <div className="loading-badge">S.I.D.</div>
          <div className="loading-title">Special Investigations</div>
          <div className="loading-sub">Loading case files…</div>
          <div className="loading-bar-track">
            <div
              className="loading-bar-fill"
              style={{ width: `${(loaded / total) * 100}%` }}
            />
          </div>
          <div className="loading-count">{loaded} / {total}</div>
        </div>
      )}

      {phase === "splash" && (
        <div className={`splash${fading ? " hidden" : ""}`}>
          <div className="splash-title">
            <span className="eyebrow">
              Neuheim Special Investigations Division
            </span>
            <h1>
              Special
              <br />
              Investigations
            </h1>
            <span className="sub">Sonderermittlungen</span>
          </div>
          <div className="lang-buttons">
            <button className="lang-btn" onClick={() => { chosenLang.current = "en"; startComic(); }}>
              English
            </button>
            <button className="lang-btn" onClick={() => { chosenLang.current = "de"; startComic(); }}>
              Deutsch
            </button>
          </div>
        </div>
      )}

      {phase === "comic" && (
        <div className="comic-viewer active" ref={viewerRef} onClick={(e) => {
          if ((e.target as HTMLElement).closest(".skip-intro-btn")) return;
          nextPage();
        }}>
          <button
            className="skip-intro-btn"
            onClick={(e) => {
              e.stopPropagation();
              sfxWhoosh();
              endIntro();
            }}
          >
            Skip Intro
          </button>
          <span className="page-counter">
            {page + 1} / {PAGES.length}
          </span>
          <div className="comic-page active" key={page}>
            <img
              src={PAGES[page]}
              alt={`Page ${page + 1}`}
              draggable={false}
            />
          </div>
          <div className="comic-progress">
            <div
              className="comic-progress-fill"
              style={{ width: `${((page + 1) / PAGES.length) * 100}%` }}
            />
          </div>
          {page < 3 && (
            <span className="click-hint">Click to continue</span>
          )}
        </div>
      )}

      {phase === "difficulty" && (
        <div className="difficulty-screen">
          <div className="difficulty-header">
            <span className="eyebrow">Select Your Rank</span>
            <h1>{chosenLang.current === "de" ? "Schwierigkeitsgrad" : "Difficulty"}</h1>
            <p>{chosenLang.current === "de" ? "Wähle deinen Rang für diese Ermittlung." : "Choose your rank for this investigation."}</p>
          </div>
          <div className="difficulty-cards">
            <button className="difficulty-card gumshoe" onClick={() => selectDifficulty("gumshoe")}>
              <span className="difficulty-rank">{chosenLang.current === "de" ? "Schnüffler" : "Gumshoe"}</span>
              <span className="difficulty-level">{chosenLang.current === "de" ? "Leicht" : "Easy"}</span>
              <p>{chosenLang.current === "de" ? "Vereinfachte Berichte. Geleitete Fragen. Ideal für den Einstieg." : "Simplified reports. Guided questions. Ideal for beginners."}</p>
            </button>
            <button className="difficulty-card officer" onClick={() => selectDifficulty("officer")}>
              <span className="difficulty-rank">Officer</span>
              <span className="difficulty-level">{chosenLang.current === "de" ? "Mittel" : "Medium"}</span>
              <p>{chosenLang.current === "de" ? "Vollständige Berichte. Offene Fragen. Die Standard-Ermittlung." : "Full reports. Open questions. The standard investigation."}</p>
            </button>
            <button className="difficulty-card lead-investigator" onClick={() => selectDifficulty("lead-investigator")}>
              <span className="difficulty-rank">{chosenLang.current === "de" ? "Leitender Ermittler" : "Lead Investigator"}</span>
              <span className="difficulty-level">{chosenLang.current === "de" ? "Schwer" : "Hard"}</span>
              <p>{chosenLang.current === "de" ? "Komplexe Berichte. Weniger Hinweise. Für erfahrene Ermittler." : "Complex reports. Fewer hints. For experienced investigators."}</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
