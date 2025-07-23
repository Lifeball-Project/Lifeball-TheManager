import * as THREE from 'three';

export function createCamera(aspect: number): THREE.PerspectiveCamera {
  const camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
  camera.position.set(0, -200, 300);
  camera.lookAt(0, 0, 0);
  return camera;
}