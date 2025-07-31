import * as THREE from 'three';
import { createBuildings } from './createBuildings';
import { registerBuilding } from '../../characters/canMoveTo';

/**
 * 건물을 생성하고 scene에 추가하고, 충돌 등록도 수행합니다.
 */
export function initBuildings(scene: THREE.Scene): void {
  const building = createBuildings();

  if (building) {
    scene.add(building);

    building.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
        registerBuilding(child); // 등록만 수행
      }
    });

    console.log('[initBuildings] 건물 추가 및 등록 완료');
  }
}