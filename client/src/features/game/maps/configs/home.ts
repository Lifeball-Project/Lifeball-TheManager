import { MapConfig } from "../types/mapConfig";

export const homeConfig: MapConfig = {
  name: 'home',
  tileSize: 2,
  tileHalf: 8,
  tileColor: 0x55aa55,
  cameraPosition: { x: 0, y: 25, z: 25 },
  cameraLookAt: { x: 0, y: 0, z: 0 },
  playerStart: { x: 0, y: 1, z: 0 },
};