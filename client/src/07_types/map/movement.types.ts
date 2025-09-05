import * as THREE from 'three';
import { CanMoveToFn, MapBoundary } from './map.types';

export type HandleMovementFn = (
  playerRef: THREE.Mesh,
  pressedKeys: Set<string>,
  speed: number,
  canMoveTo: CanMoveToFn,
  mapBoundary: MapBoundary
) => void;