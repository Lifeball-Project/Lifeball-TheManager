import * as THREE from 'three';

export function createBuilding(): THREE.Mesh {
  const building = new THREE.Mesh(
    new THREE.BoxGeometry(4, 6, 4),
    new THREE.MeshStandardMaterial({ color: 0x888888 })
  );
  building.position.set(5, 3, 5); // 중심 높이 y=3
  return building;
}