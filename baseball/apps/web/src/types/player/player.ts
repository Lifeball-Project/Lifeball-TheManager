import type { PlayerId } from "./player-id";
import type { Race } from "./race/race-types";
import type { Position } from "./player-position";
import type { PlayerStats } from "./stats/stats-types";
import type { PlayerTag } from './tag/tag-types';

// 기본 플레이어 인터페이스
export interface BasePlayer {
  id: PlayerId;
  race: Race;
  position: Position;
}

// 사용할 플레이어 인터페이스
export interface Player extends BasePlayer {
  stats?: PlayerStats;
  tags?: PlayerTag[];
}