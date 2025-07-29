import * as THREE from 'three';

const buildingBoxes: THREE.Box3[] = [];

export function registerBuilding(mesh: THREE.Mesh) {
  const box = new THREE.Box3().setFromObject(mesh);
  buildingBoxes.push(box);
}

export function canMoveTo(nextX: number, nextZ: number): boolean {
  const playerSize = new THREE.Vector3(0.3, 0.8, 0.3); // 캐릭터 충돌 박스 크기
  const futureBox = new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(nextX, 0.75, nextZ), // 이동 예상 위치
    playerSize
  );

  return !buildingBoxes.some(buildingBox => futureBox.intersectsBox(buildingBox));
}