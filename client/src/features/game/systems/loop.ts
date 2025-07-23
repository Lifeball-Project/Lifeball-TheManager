// systems/loop.ts
import * as THREE from 'three';

export function createAnimationLoop(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
  update?: () => void
) {
  function animate() {
    requestAnimationFrame(animate);
    if (update) update(); // 예: player 이동, camera follow
    renderer.render(scene, camera);
  }
  animate();
}