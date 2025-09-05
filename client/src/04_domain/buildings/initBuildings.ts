import * as THREE from 'three';
import { createBuilding } from './createBuilding';
import { registerBuilding } from './buildingState';
import { buildingPresets } from './buildingPresets';

/**
 * 건물을 생성하고 scene에 추가하고, 충돌 등록도 수행합니다.
 */
export function initBuildings(scene: THREE.Scene): void {
  buildingPresets.forEach((preset) => {
    const mesh = createBuilding(preset);
    scene.add(mesh);
    registerBuilding(mesh);
  });

  console.log('[initBuildings] 건물 추가 및 등록 완료');
}