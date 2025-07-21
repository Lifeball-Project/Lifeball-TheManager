// 종족
export type Race = "휴먼" | "엘프" | "드워프" | "오우거" | "고블린" | "하피" | "언데드" | "슬라임";
// 포지션
export type Position = "투수" | "포수" | "1루수" | "2루수" | "3루수" | "유격수" | "좌익수" | "중견수" | "우익수" | "지명타자";

// 선수 능력치
export interface PlayerStats {
  speed: number; // 속도
  power: number; // 파워
  contact: number; // 컨택트
  defense: number; // 수비력
  pitching?: number; // 투구력 (투수 전용)
}

export interface Player {
  id: number;
  race: Race;
  position: Position;
  stats?: PlayerStats;
  tags?: PlayerTag[];
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