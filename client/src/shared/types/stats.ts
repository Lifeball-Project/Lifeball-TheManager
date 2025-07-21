import { Race } from "./player";

// 선수 능력치
export interface PlayerStats {
  speed: number; // 속도
  power: number; // 파워
  contact: number; // 컨택트
  defense: number; // 수비력
  pitching?: number; // 투구력 (투수 전용)
}

// 휴먼 기준 기본 능력치
export const baseStats: PlayerStats = {
  speed: 5,
  power: 5,
  contact: 5,
  defense: 5,
  pitching: 5,
};

// 종족별 능력치 보정
export const statModifiersByRace: Record<Race, Partial<PlayerStats>> = {
  휴먼: {},
  엘프: { speed: 1, power: -1 },
  드워프: { power: 2, speed: -2 },
  오우거: { power: 4, speed: -3 },
  고블린: { speed: 2, power: -2 },
  하피: { speed: 3, defense: -1 },
  언데드: { defense: 1, contact: -1 },
  슬라임: { pitching: 1, contact: -1 },
};