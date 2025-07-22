import * as THREE from 'three';

export function handleMovement(
  playerRef: THREE.Mesh,
  pressedKeys: Set<string>,
  speed: number,
  canMoveTo: (x: number, z: number) => boolean
) {
  const nextX = playerRef.position.x;
  const nextZ = playerRef.position.z;
  let newX = nextX;
  let newZ = nextZ;

  // 이동 키 입력 처리
  if (pressedKeys.has('w')) newZ = Math.max(nextZ - speed, -16);
  if (pressedKeys.has('s')) newZ = Math.min(nextZ + speed, 16);
  if (pressedKeys.has('a')) newX = Math.max(nextX - speed, -16);
  if (pressedKeys.has('d')) newX = Math.min(nextX + speed, 16);

  if (canMoveTo(newX, newZ)) {
    playerRef.position.x = newX;
    playerRef.position.z = newZ;
  }
}