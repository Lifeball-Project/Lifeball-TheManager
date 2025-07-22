import * as THREE from 'three';

export function canMoveToNextPosition({
  playerRef,
  buildingBox,
  playerBox,
  hasCollidedRef,
  nextX,
  nextZ,
  onCollision,
}: {
  playerRef: THREE.Mesh;
  buildingBox: THREE.Box3;
  playerBox: THREE.Box3;
  hasCollidedRef: React.MutableRefObject<boolean>;
  nextX: number;
  nextZ: number;
  onCollision?: () => void;
}): boolean {
  playerBox.setFromObject(playerRef);
  const clone = playerBox.clone();
  const delta = new THREE.Vector3(nextX - playerRef.position.x, 0, nextZ - playerRef.position.z);
  clone.translate(delta);

  if (clone.intersectsBox(buildingBox)) {
    if (!hasCollidedRef.current) {
      hasCollidedRef.current = true;
      onCollision?.(); // 콜백으로 충돌 후 처리
    }
    return false;
  }

  return true;
}