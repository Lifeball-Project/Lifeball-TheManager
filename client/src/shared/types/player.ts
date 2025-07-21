import { PlayerStats } from "./stats";
import { PlayerTag } from "./tag";

// 종족
export type Race =
  | "휴먼"
  | "엘프"
  | "드워프"
  | "오우거"
  | "고블린"
  | "하피"
  | "언데드"
  | "슬라임";

// 포지션
export type Position =
  | "투수"
  | "포수"
  | "1루수"
  | "2루수"
  | "3루수"
  | "유격수"
  | "좌익수"
  | "중견수"
  | "우익수"
  | "지명타자";

// 플레이어 인터페이스
export interface Player {
  id: number;
  race: Race;
  position: Position;
  stats?: PlayerStats;
  tags?: PlayerTag[];
}