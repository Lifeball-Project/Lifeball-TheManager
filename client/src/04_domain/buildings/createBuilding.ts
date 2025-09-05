import * as THREE from 'three';
import { BuildingPreset } from './buildingPresets';


export function createBuilding(preset: BuildingPreset): THREE.Mesh {
  const { cols, rows } = preset.size;
  const geometry = new THREE.PlaneGeometry(cols, rows);
  const material = new THREE.MeshStandardMaterial({ transparent: true });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = preset.name;

  mesh.position.set(preset.position.x, preset.position.y, preset.position.z);
  mesh.rotation.x = preset.rotationX ?? -Math.PI / 6;

  const loader = new THREE.TextureLoader();
  if (preset.texturePath) {
    loader.load(preset.texturePath, (texture) => {
      if (preset.tileCoords) {
        const tilesPerRow = 32;
        const tileSize = 2 / tilesPerRow;

        texture.repeat.set(tileSize * cols, tileSize * rows);
        texture.offset.set(
          preset.tileCoords.col * tileSize,
          1 - tileSize * (preset.tileCoords.row + rows)
        );
      }

      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;

      material.map = texture;
      material.needsUpdate = true;
    });
  }

  return mesh;
}