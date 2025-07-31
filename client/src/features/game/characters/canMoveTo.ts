import * as THREE from 'three';

type BuildingCollision = {
  id: string; // 건물 ID
  box: THREE.Box3; // 건물의 충돌 박스
};


const buildingBoxes: BuildingCollision[] = [];

export function registerBuilding(mesh: THREE.Mesh) {
  const box = new THREE.Box3().setFromObject(mesh);
  buildingBoxes.push({
    id: mesh.name || 'unnamed',
    box,
  });
}

export function canMoveTo(nextX: number, nextZ: number): string | null {
  const playerSize = new THREE.Vector3(0.3, 0.8, 0.3); // 캐릭터 충돌 박스 크기
  const futureBox = new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(nextX, 0.75, nextZ), // 이동 예상 위치
    playerSize
  );

  for (const buildingBox of buildingBoxes) {
    if (futureBox.intersectsBox(buildingBox.box)) {
      return buildingBox.id;
    }
  }

  return null;
}