// characters/CharacterController.ts
import * as THREE from 'three';
import { DEFAULT_SPEED } from './DEFAULT_SPEED';

export function CharacterController(
  character: THREE.Mesh,
  pressedKeys: Set<string>
) {
  if (pressedKeys.has('w')) character.position.y += DEFAULT_SPEED;
  if (pressedKeys.has('s')) character.position.y -= DEFAULT_SPEED;
  if (pressedKeys.has('a')) character.position.x -= DEFAULT_SPEED;
  if (pressedKeys.has('d')) character.position.x += DEFAULT_SPEED;
}