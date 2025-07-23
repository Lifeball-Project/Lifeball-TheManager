export interface MapConfig {
  name: string;
  tileSize: number;
  tileHalf: number;
  tileColor: number | string;
  cameraPosition: { x: number; y: number; z: number };
  cameraLookAt: { x: number; y: number; z: number };
  playerStart: { x: number; y: number; z: number };
}