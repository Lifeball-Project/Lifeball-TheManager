import { Position } from "07_types/player/player-position";
import { PlayerTag } from "07_types/tag/tag-types";

export interface SetupPlayer {
  id: number;
  position: Position;
  race: "휴먼";
  tags?: PlayerTag[];
}