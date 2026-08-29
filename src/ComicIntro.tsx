import { useCallback, useEffect, useRef, useState } from "react";
import { initAudio, startMusic, stopMusic, sfxClick, sfxPageTurn, sfxWhoosh, playSfxFile } from "./lib/audio";
import type { SfxHandle } from "./lib/audio";

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

type Phase = "loading" | "splash" | "comic" | "done";

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

export default function ComicIntro({ onComplete }: { onComplete: (language: "en" | "de") => void }) {
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
    if (phase === "done") return;
    setPhase("done");
    setFading(true);
    stopPageSfx();
    ragtime.current?.fadeOut(3);
    ragtime.current = null;
    stopMusic();
    setTimeout(() => onComplete(chosenLang.current), 1000);
  }, [onComplete, phase]);

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
    </div>
  );
}
