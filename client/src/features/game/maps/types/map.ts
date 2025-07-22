export interface Map {
  name: string;
  tileSize: number;
  tileHalf: number;
  tileColor: number;
  cameraPosition: { x: number; y: number; z: number };
  cameraLookAt: { x: number; y: number; z: number };
  playerStart: { x: number; y: number; z: number };
}