import * as THREE from 'three';

export function createCharacter(): THREE.Mesh {
  const player = new THREE.Mesh(
    new THREE.BoxGeometry(12, 36, 12),
    new THREE.MeshBasicMaterial({ color: 0x4444ff })
  );
  // 타일보다 살짝 위로 배치함(x, y, z)
  player.position.set(0, 1, 0);
  return player;
}