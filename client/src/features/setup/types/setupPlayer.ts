import { Position } from "@/types/player/player";
import { PlayerTag } from "@/types/tag/tag-modifiers";

export interface SetupPlayer {
  id: number;
  position: Position;
  race: "휴먼";
  tags?: PlayerTag[];
}