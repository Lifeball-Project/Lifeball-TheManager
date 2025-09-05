// Three.js를 임포트하여 3D 객체 및 충돌 박스 사용
import * as THREE from 'three';

// 건물 충돌 상태를 저장하고 관리하는 Zustand 스토어
import { useCollisionStore } from '@/store/useCollosionStore';

// 건물 충돌 박스 정보를 저장하는 배열 (외부에서 registerBuilding을 통해 추가됨)
export const buildingBoxes: BuildingCollision[] = [];

// 건물 충돌 정보를 나타내는 타입
type BuildingCollision = {
  id: string;       // 건물 고유 ID (name으로 구분)
  box: THREE.Box3;  // 건물의 충돌 박스 (3D 영역)
};

// 플레이어 위치를 기반으로 건물 충돌 여부를 확인하고 상태 업데이트
export function checkCollision(playerX: number, playerZ: number) {
  // 현재 충돌 상태(store) 가져오기
  const { buildingId, setBuildingId } = useCollisionStore.getState();

  // 모든 건물과 충돌 여부 확인
  // console.log(`[checkCollision] player pos: (${playerX}, ${playerZ})`);

  for (const { id, box } of buildingBoxes) {
    // 건물 중심 좌표 계산
    const centerX = (box.min.x + box.max.x) / 2;
    const centerZ = (box.min.z + box.max.z) / 2;

    // 건물 반지름 + 여유값
    const rangeX = (box.max.x - box.min.x) / 2 + 0.5;
    const rangeZ = (box.max.z - box.min.z) / 2 + 0.5;

    const dx = Math.abs(playerX - centerX);
    const dz = Math.abs(playerZ - centerZ);

    if (dx <= rangeX && dz <= rangeZ) {
      if (buildingId !== id) {
        setBuildingId(id);
      }
      return;
    }
  }

  // 모든 건물과 충돌하지 않은 경우 buildingId 초기화
  if (buildingId !== null) setBuildingId(null);
}