import * as THREE from 'three';
import { buildingBoxes } from '../../systems/collision';

export function registerBuilding(mesh: THREE.Mesh) {
  console.log('[registerBuilding]', mesh.name);
  const box = new THREE.Box3().setFromObject(mesh);
  console.log(`[registerBuilding box] ${mesh.name}:`, box.min, box.max);
  buildingBoxes.push({
    id: mesh.name || 'unnamed',
    box,
  });
  console.log('[registerBuilding]', mesh.name, mesh.geometry, mesh.material);
}