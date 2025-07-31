import * as THREE from 'three';
import { buildingBoxes } from '../systems/collision';

export function canMoveTo(nextX: number, nextZ: number): boolean {
  const playerSize = new THREE.Vector3(0.3, 0.8, 0.3);
  const futureBox = new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(nextX, 0.75, nextZ),
    playerSize
  );

  for (const buildingBox of buildingBoxes) {
    if (futureBox.intersectsBox(buildingBox.box)) {
      return false; // 이동 불가
    }
  }

  return true; // 이동 가능
}