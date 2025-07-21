import { PlayerStats } from "./stats";

// 태그
export type PlayerTag =
  | "빠름"
  | "강타자"
  | "정확함"
  | "수비장인"
  | "투수지존"
  | "비만"
  | "빈약함"
  | "부정확"
  | "새가슴"
  | "긴장감";

export const statModifiersByTag: Record<PlayerTag, Partial<PlayerStats>> = {
  // 능력치 업 태그
  빠름: { speed: 1 },
  강타자: { power: 1 },
  정확함: { contact: 1 },
  수비장인: { defense: 1 },
  투수지존: { pitching: 1 },

  // 능력치 다운 태그
  비만: { speed: -1 },
  빈약함: { power: -1 },
  부정확: { contact: -1 },
  새가슴: { defense: -1 },
  긴장감: { pitching: -1 },
};