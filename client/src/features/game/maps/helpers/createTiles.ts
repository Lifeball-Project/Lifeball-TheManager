import * as THREE from 'three';

export function createTileGrid(
  tileSize: number,
  half: number,
  material: THREE.Material
): THREE.Mesh[] {
  const tiles: THREE.Mesh[] = [];

  for (let x = -half; x <= half; x++) {
    for (let z = -half; z <= half; z++) {
      const tile = new THREE.Mesh(
        new THREE.PlaneGeometry(tileSize, tileSize),
        material
      );
      tile.rotation.x = -Math.PI / 2;
      tile.position.set(x * tileSize, 0, z * tileSize);
      tiles.push(tile);
    }
  }

  return tiles;
}