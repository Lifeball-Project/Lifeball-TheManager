import { keyMap } from './keyMap';
import { HandleMovementFn } from '../types/map/movement.types';

export const handleMovement: HandleMovementFn = (
  playerRef,
  pressedKeys,
  speed,
  canMoveTo,
  mapBoundary
) => {

  const nextX = playerRef.position.x;
  const nextZ = playerRef.position.z;
  let newX = nextX;
  let newZ = nextZ;

  for (const key of pressedKeys) {
    const direction = keyMap[key];
    if (direction === 'up') newZ = Math.max(nextZ - speed, mapBoundary.minZ);
    if (direction === 'down') newZ = Math.min(nextZ + speed, mapBoundary.maxZ);
    if (direction === 'left') newX = Math.max(nextX - speed, mapBoundary.minX);
    if (direction === 'right') newX = Math.min(nextX + speed, mapBoundary.maxX);
  }
  if (canMoveTo(newX, newZ)) {
    playerRef.position.set(newX, playerRef.position.y, newZ);
  }
}