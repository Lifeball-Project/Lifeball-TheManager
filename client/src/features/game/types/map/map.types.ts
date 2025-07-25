export interface MapBoundary {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

export type CanMoveToFn = (x: number, z: number) => boolean;
