import { PlayerId } from "./player-id";
import { Race } from "../race/race-types";
import { Position } from "./player-position";
import { PlayerStats } from "../stats/stats-types";
import { PlayerTag } from '../tag/tag-types';

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