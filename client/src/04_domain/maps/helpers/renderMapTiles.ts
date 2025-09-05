import * as THREE from 'three';
import { initTiles } from './initTiles';
import { initBuildings } from '04_domain/buildings/initBuildings';
import { initHouseTiles } from './initHouseTiles';
import { initStadiumTiles } from './initStadiumTiles';

export function renderMapTiles(currentMap: string, scene: THREE.Scene) {
  switch (currentMap) {
    case 'default':
      initTiles(scene);
      initBuildings(scene);
      break;
    case 'house':
      initHouseTiles(scene);
      break;
    case 'stadium':
      initStadiumTiles(scene);
      break;
  }
}