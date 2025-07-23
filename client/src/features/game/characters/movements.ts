import * as THREE from 'three';

export function handleMovement(
  playerRef: THREE.Mesh,
  pressedKeys: Set<string>,
  speed: number,
  canMoveTo: (x: number, z: number) => boolean,
  mapBoundary: { minX: number; maxX: number; minZ: number; maxZ: number }
) {
  const nextX = playerRef.position.x;
  const nextZ = playerRef.position.z;
  let newX = nextX;
  let newZ = nextZ;

  // 이동 키 입력 처리
  if (pressedKeys.has('w')) newZ = Math.max(nextZ - speed, mapBoundary.minZ);
  if (pressedKeys.has('s')) newZ = Math.min(nextZ + speed, mapBoundary.maxZ);
  if (pressedKeys.has('a')) newX = Math.max(nextX - speed, mapBoundary.minX);
  if (pressedKeys.has('d')) newX = Math.min(nextX + speed, mapBoundary.maxX);

  if (canMoveTo(newX, newZ)) {
    playerRef.position.x = newX;
    playerRef.position.z = newZ;
  }
}