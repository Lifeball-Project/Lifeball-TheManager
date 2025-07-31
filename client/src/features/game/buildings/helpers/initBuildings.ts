import * as THREE from 'three';
import { createBuildings } from './createBuildings';
import { registerBuilding } from '../../characters/canMoveTo';

/**
 * 건물을 생성하고 scene에 추가하고, 충돌 등록도 수행합니다.
 */
export function initBuildings(scene: THREE.Scene) {
  const building = createBuildings();
  if (building) {
    scene.add(building);
    registerBuilding(building); // 태그는 예시입니다
    console.log('[initBuildings] 건물 추가 및 등록 완료');
  }
}