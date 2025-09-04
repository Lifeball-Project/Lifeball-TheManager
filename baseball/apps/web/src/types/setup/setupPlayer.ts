import type { Position } from "../player/player-position";
import type { PlayerTag } from "../player/tag/tag-types";

export interface SetupPlayer {
  id: number;
  position: Position;
  race: "휴먼";
  tags?: PlayerTag[];
}