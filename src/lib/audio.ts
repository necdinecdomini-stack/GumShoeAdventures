let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let musicGain: GainNode | null = null;
let sfxGain: GainNode | null = null;
let musicSource: AudioBufferSourceNode | null = null;
let musicBuffer: AudioBuffer | null = null;
let _muted = false;
let _volume = 0.5;

function getCtx(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext();
    masterGain = ctx.createGain();
    masterGain.gain.value = _volume;
    masterGain.connect(ctx.destination);

    musicGain = ctx.createGain();
    musicGain.gain.value = 0.4;
    musicGain.connect(masterGain);

    sfxGain = ctx.createGain();
    sfxGain.gain.value = 0.7;
    sfxGain.connect(masterGain);
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

// ── Music ──

const bufferCache = new Map<string, AudioBuffer>();
let currentTrack = "";

async function loadTrack(path: string): Promise<AudioBuffer | null> {
  const cached = bufferCache.get(path);
  if (cached) return cached;
  try {
    const res = await fetch(path);
    if (!res.ok) return null;
    const data = await res.arrayBuffer();
    const buf = await getCtx().decodeAudioData(data);
    bufferCache.set(path, buf);
    return buf;
  } catch {
    return null;
  }
}

export async function startMusic(path = "/audio/ambient.mp3") {
  if (musicSource && currentTrack === path) return;
  stopMusic();
  const buf = await loadTrack(path);
  if (!buf) return;
  const c = getCtx();
  musicSource = c.createBufferSource();
  musicSource.buffer = buf;
  musicSource.loop = true;
  musicSource.connect(musicGain!);
  musicSource.start();
  currentTrack = path;
}

export function stopMusic() {
  try { musicSource?.stop(); } catch {}
  musicSource = null;
  currentTrack = "";
}

// ── File-based SFX ──

export type SfxHandle = { stop: () => void; fadeOut: (seconds: number) => void };

export async function playSfxFile(
  path: string,
  loop = false,
): Promise<SfxHandle> {
  const noop: SfxHandle = { stop() {}, fadeOut() {} };
  const buf = await loadTrack(path);
  if (!buf) return noop;
  const c = getCtx();
  const src = c.createBufferSource();
  const g = c.createGain();
  src.buffer = buf;
  src.loop = loop;
  src.connect(g);
  g.connect(sfxGain!);
  src.start();
  return {
    stop() { try { src.stop(); } catch {} },
    fadeOut(seconds: number) {
      g.gain.setValueAtTime(g.gain.value, c.currentTime);
      g.gain.linearRampToValueAtTime(0, c.currentTime + seconds);
      setTimeout(() => { try { src.stop(); } catch {} }, seconds * 1000);
    },
  };
}

// ── Synthesised SFX ──

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = "sine",
  volumeMul = 1,
) {
  const c = getCtx();
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = 0.15 * volumeMul;
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
  osc.connect(g);
  g.connect(sfxGain!);
  osc.start();
  osc.stop(c.currentTime + duration);
}

function playNoise(duration: number, volumeMul = 1) {
  const c = getCtx();
  const len = c.sampleRate * duration;
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
  const src = c.createBufferSource();
  src.buffer = buf;
  const g = c.createGain();
  g.gain.value = 0.08 * volumeMul;
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
  const filter = c.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 2000;
  src.connect(filter);
  filter.connect(g);
  g.connect(sfxGain!);
  src.start();
  src.stop(c.currentTime + duration);
}

export function sfxClick() {
  playTone(800, 0.06, "square", 0.5);
  playTone(600, 0.04, "sine", 0.3);
}

export function sfxPageTurn() {
  playNoise(0.15);
  playTone(300, 0.08, "sine", 0.2);
}

export function sfxOpen() {
  playTone(400, 0.1, "sine", 0.4);
  setTimeout(() => playTone(600, 0.1, "sine", 0.3), 50);
}

export function sfxClose() {
  playTone(600, 0.08, "sine", 0.4);
  setTimeout(() => playTone(400, 0.1, "sine", 0.3), 40);
}

export function sfxWhoosh() {
  playNoise(0.25, 1.2);
}

export function sfxTypewriter() {
  playTone(1200 + Math.random() * 400, 0.03, "square", 0.2);
}

// ── Volume / Mute ──

export function setVolume(v: number) {
  _volume = Math.max(0, Math.min(1, v));
  if (masterGain) masterGain.gain.value = _muted ? 0 : _volume;
}

export function getVolume() {
  return _volume;
}

export function toggleMute(): boolean {
  _muted = !_muted;
  if (masterGain) masterGain.gain.value = _muted ? 0 : _volume;
  return _muted;
}

export function isMuted() {
  return _muted;
}

// ── Init (call on first user interaction) ──

export function initAudio() {
  getCtx();
}
