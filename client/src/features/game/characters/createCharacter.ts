import * as THREE from 'three';

export function createCharacter(): THREE.Mesh {
  const player = new THREE.Mesh(
    new THREE.PlaneGeometry(0.3, 1),
    new THREE.MeshBasicMaterial({ color: 0x4444ff, side: THREE.DoubleSide })
  );
  // 타일보다 살짝 위로 배치함(x, y, z)
  player.position.set(0, 0.75, 0);
  return player;
}