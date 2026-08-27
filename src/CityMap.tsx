import { useEffect, useState } from "react";
import { sfxClick } from "./lib/audio";
import "./city-map.css";

export type LocationId =
  | "police-hq"
  | "riverside-hall"
  | "timmy-restaurant"
  | "courthouse"
  | "harbor";

interface Location {
  id: LocationId;
  name: string;
  nameDe: string;
  description: string;
  icon: string;
  gridArea: string;
  unlocked: boolean;
}

const LOCATIONS: Location[] = [
  {
    id: "police-hq",
    name: "RPD Headquarters",
    nameDe: "RPD Hauptquartier",
    description: "Special Investigations Division — Evidence Terminal",
    icon: "🏛",
    gridArea: "hq",
    unlocked: true,
  },
  {
    id: "riverside-hall",
    name: "Riverside Community Hall",
    nameDe: "Gemeindehaus Riverside",
    description: "Crime scene — Case 81-F",
    icon: "🔥",
    gridArea: "riverside",
    unlocked: true,
  },
  {
    id: "timmy-restaurant",
    name: "Timmy Two-Shoes' Restaurant",
    nameDe: "Timmy Two-Shoes' Restaurant",
    description: "Crime scene — Case MPD-2026-1187",
    icon: "🍽",
    gridArea: "timmy",
    unlocked: true,
  },
  {
    id: "courthouse",
    name: "Neuheim Courthouse",
    nameDe: "Amtsgericht Neuheim",
    description: "District court — Witness testimony",
    icon: "⚖",
    gridArea: "court",
    unlocked: true,
  },
  {
    id: "harbor",
    name: "The Harbor",
    nameDe: "Der Hafen",
    description: "Docklands — Informants and rumors",
    icon: "⚓",
    gridArea: "harbor",
    unlocked: true,
  },
];

export default function CityMap({
  onNavigate,
}: {
  onNavigate: (id: LocationId) => void;
}) {
  const [entered, setEntered] = useState(false);
  const [hoveredId, setHoveredId] = useState<LocationId | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`city-map${entered ? " entered" : ""}`}>
      <div className="map-rain" />

      <header className="map-header">
        <span className="map-eyebrow">Neuheim — Sonderermittlungen</span>
        <h1>City Map</h1>
        <span className="map-subtitle">Select a location to investigate</span>
      </header>

      <div className="map-container">
        <svg
          className="map-streets"
          viewBox="0 0 800 500"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* River */}
          <path
            d="M 0 340 Q 200 300 400 330 Q 600 360 800 320"
            fill="none"
            stroke="var(--river)"
            strokeWidth="28"
            opacity="0.3"
          />
          <path
            d="M 0 340 Q 200 300 400 330 Q 600 360 800 320"
            fill="none"
            stroke="var(--river)"
            strokeWidth="2"
            opacity="0.5"
          />

          {/* Main streets */}
          <g stroke="var(--street)" strokeWidth="2" opacity="0.4">
            {/* Hauptstraße — horizontal main road */}
            <line x1="50" y1="200" x2="750" y2="200" />
            {/* Uferstraße — along the river */}
            <line x1="50" y1="310" x2="750" y2="310" />
            {/* Marktstraße — vertical */}
            <line x1="400" y1="50" x2="400" y2="450" />
            {/* Hafenweg — vertical right */}
            <line x1="650" y1="50" x2="650" y2="450" />
            {/* Rathausstraße — vertical left */}
            <line x1="180" y1="50" x2="180" y2="450" />
          </g>

          {/* Secondary streets */}
          <g stroke="var(--street)" strokeWidth="1" opacity="0.2">
            <line x1="50" y1="120" x2="750" y2="120" />
            <line x1="50" y1="400" x2="750" y2="400" />
            <line x1="290" y1="50" x2="290" y2="450" />
            <line x1="530" y1="50" x2="530" y2="450" />
          </g>

          {/* Street labels */}
          <g fill="var(--street-label)" fontSize="9" fontFamily="inherit" opacity="0.5">
            <text x="60" y="195">HAUPTSTRASSE</text>
            <text x="60" y="305">UFERSTRASSE</text>
            <text x="185" y="70" transform="rotate(90 185 70)">RATHAUSSTR.</text>
            <text x="405" y="70" transform="rotate(90 405 70)">MARKTSTRASSE</text>
            <text x="655" y="70" transform="rotate(90 655 70)">HAFENWEG</text>
          </g>

          {/* Building blocks */}
          <g fill="var(--building)" opacity="0.15">
            <rect x="60" y="130" width="100" height="60" rx="2" />
            <rect x="200" y="130" width="70" height="60" rx="2" />
            <rect x="310" y="210" width="70" height="80" rx="2" />
            <rect x="440" y="130" width="70" height="60" rx="2" />
            <rect x="550" y="210" width="70" height="80" rx="2" />
            <rect x="200" y="210" width="70" height="80" rx="2" />
            <rect x="440" y="210" width="70" height="80" rx="2" />
            <rect x="680" y="130" width="60" height="60" rx="2" />
            <rect x="60" y="360" width="100" height="30" rx="2" />
            <rect x="310" y="360" width="70" height="30" rx="2" />
            <rect x="550" y="360" width="70" height="30" rx="2" />
          </g>
        </svg>

        <div className="map-locations">
          {LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              className={`map-pin${hoveredId === loc.id ? " hovered" : ""}${!loc.unlocked ? " locked" : ""}`}
              style={{ gridArea: loc.gridArea }}
              disabled={!loc.unlocked}
              onMouseEnter={() => setHoveredId(loc.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => {
                sfxClick();
                onNavigate(loc.id);
              }}
              aria-label={loc.name}
            >
              <span className="pin-beacon" />
              <span className="pin-icon">{loc.icon}</span>
              <span className="pin-label">
                <strong>{loc.name}</strong>
                <small>{loc.description}</small>
              </span>
            </button>
          ))}
        </div>
      </div>

      <footer className="map-footer">
        <span>NEUHEIM POLICE DEPARTMENT</span>
        <span>INVESTIGATIONS MAP</span>
      </footer>
    </div>
  );
}
