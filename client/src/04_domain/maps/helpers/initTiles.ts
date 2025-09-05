import * as THREE from 'three';
import { createTilesFromUnityJson } from './createTiles';

export async function initTiles(scene: THREE.Scene) {
  const tiles = await createTilesFromUnityJson(
    '/assets/textures/maps/main.json',
    '/assets/textures/maps/Serene_Village_16x16.png',
    1, // tileSize (Three.js world 기준 단위)
    16 // tilesPerRow
  );
  tiles.forEach(tile => scene.add(tile));
}