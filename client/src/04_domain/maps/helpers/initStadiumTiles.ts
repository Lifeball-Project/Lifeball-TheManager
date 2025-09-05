import * as THREE from 'three';
import { registerBuilding } from '04_domain/buildings/buildingState';
import { useMapStore } from '06_store/useMapStore';
import { useCollisionStore } from '06_store/useCollisionStore';

export function initStadiumTiles(scene: THREE.Scene) {
  const { currentMap, exitMap } = useMapStore.getState();
  const { buildingId } = useCollisionStore.getState();

  scene.background = new THREE.Color('white');

  // 나중에 바닥 추가
  // const plane = new THREE.Mesh(
  //   new THREE.PlaneGeometry(20, 20),
  //   new THREE.MeshStandardMaterial({ color: 'brown' }) // 바닥색

  // );

  const building = new THREE.Mesh(
    new THREE.PlaneGeometry(0.5, 1),
    new THREE.MeshStandardMaterial({ color: 'lightblue' }) // 건물 색
  );
  building.name = 'exit';
  building.position.set(0, 1, 8); // 건물 위치 조정
  building.rotation.x = -Math.PI / 6;

  scene.add(building);
  registerBuilding(building); // 건물 등록
  console.log('[exit listener] 현재 buildingId:', buildingId);
  
  
  window.addEventListener('keydown', (e) => {
    const id = useCollisionStore.getState().buildingId;
    if (e.code === 'Space') {
      if (currentMap === 'house' && id === 'exit') {
        console.log('🏠 [스페이스바] 건물 "exit"과 상호작용 → 기본 맵으로 돌아감');
        exitMap();
      }
    }
  });
}