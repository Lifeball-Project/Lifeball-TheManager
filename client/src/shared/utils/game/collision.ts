import * as THREE from 'three';

export function isColliding(a: THREE.Box3, b: THREE.Box3): boolean {
  return a.intersectsBox(b);
}