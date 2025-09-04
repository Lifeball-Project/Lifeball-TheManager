import * as Phaser from 'phaser'
import { createTiles } from '../maps/helpers/createTiles'
import basicMap from '../maps/data/basicMap.json'
import type { MapData } from '@/types/map/map-types'
export class MainScene extends Phaser.Scene {
  create() {
    console.log('[MainScene] create')

    createTiles(this, basicMap as MapData)
  }
}