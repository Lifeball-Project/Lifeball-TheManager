import * as THREE from 'three';

export function followPlayer(camera: THREE.PerspectiveCamera, playerRef: THREE.Mesh) {
  camera.position.set(
    playerRef.position.x,
    playerRef.position.y + 25,
    playerRef.position.z + 25
  );
  camera.lookAt(playerRef.position);
}