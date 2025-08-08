import * as THREE from 'three';
import { useCharacterStore } from '@/store/useCharacterStore';
import { useMapStore } from '@/store/useMapStore';

import {
  handleMovement,
  defaultSpeed,
  canMoveTo,
} from '../characters';

import { mapConfig } from '../maps/helpers/mapConfig';
import { checkCollision } from '../systems/collision';

let currentAnimationId: number | null = null;

export function startAnimationLoop({
  scene,
  camera,
  renderer,
  getPressedKeys,
  gridSize,
}: {
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  renderer: THREE.WebGLRenderer;
  getPressedKeys: () => { pressedKeys: Set<string> };
  gridSize: number;
  }): number {
  if (currentAnimationId !== null) {
    cancelAnimationFrame(currentAnimationId);
  }

  const animate = () => {
    currentAnimationId = requestAnimationFrame(animate);

    const pressedKeys = getPressedKeys().pressedKeys;
    const character = useCharacterStore.getState().character;
    const { currentMap } = useMapStore.getState();

    if (character) {
      handleMovement(character, pressedKeys, defaultSpeed, canMoveTo, {
        minX: -gridSize / 2,
        maxX: gridSize / 2,
        minZ: -gridSize / 2,
        maxZ: gridSize / 2,
      });

      if (mapConfig[currentMap].enableCollision) {
        checkCollision(character.position.x, character.position.z);
      }

      camera.position.set(character.position.x, character.position.y + 10, character.position.z + 15);
      camera.lookAt(character.position);
    }

    renderer.render(scene, camera);
  };
  currentAnimationId = requestAnimationFrame(animate);
  return currentAnimationId;
}