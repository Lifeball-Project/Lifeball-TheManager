import * as THREE from 'three';
import { createCharacter } from './createCharacter';
import { useCharacterStore } from '@/store/useCharacterStore';

export function initCharacter(scene: THREE.Scene) {
  const character = createCharacter();
  scene.add(character);
  useCharacterStore.getState().setCharacter(character);
  console.log('[initCharacter] 캐릭터 생성 위치:', character.position.toArray());
}