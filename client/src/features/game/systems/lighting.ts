import * as THREE from 'three';

export function addDefaultLighting(scene: THREE.Scene) {
  // 기본 전체 조명
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  // 방향성 조명 (태양 같은 역할)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 20, 10);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
}