import type { Difficulty } from "./types";

export function getForDifficulty<T>(map: Partial<Record<Difficulty, T>>, difficulty: Difficulty): T {
  return map[difficulty] ?? map["officer"] ?? Object.values(map)[0]!;
}
