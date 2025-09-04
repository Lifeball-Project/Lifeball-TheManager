// 선수 능력치
export interface PlayerStats {
  speed: number; // 속도
  power: number; // 파워
  contact: number; // 컨택트
  defense: number; // 수비력
  pitching?: number; // 투구력
}