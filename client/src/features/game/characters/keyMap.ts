import { Direction } from "../types/character/direction.types";

export const keyMap: Record<string, Direction | undefined> = {
  w: 'up',
  s: 'down',
  a: 'left',
  d: 'right',
};