export interface BuildingPreset {
  name: string;
  texturePath?: string;
  size: { cols: number; rows: number };
  tileCoords?: { col: number; row: number }; 
  position: { x: number; y: number; z: number };
  rotationX?: number;
}

export const buildingPresets: BuildingPreset[] = [
  {
    name: 'house',
    texturePath: '/assets/textures/maps/hometile.png',
    size: { cols: 2.5, rows: 3 },
    tileCoords: { col: 10.4, row: 2 },
    position: { x: -7, y: 1.5, z: -8 },
    rotationX: -Math.PI / 6,
  },
  {
    name: 'stadium',
    size: { cols: 10, rows: 4 },
    position: { x: 6, y: 1.5, z: -8 },
    rotationX: -Math.PI / 6,
  },
];