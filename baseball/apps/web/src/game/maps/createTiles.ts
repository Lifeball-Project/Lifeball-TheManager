import Phaser from 'phaser'
import { TILE_SIZE, TILE_COLORS } from '../constants/tiles'

export type MapData = { width: number; height: number; tiles: string[][] }

export function createTiles(scene: Phaser.Scene, map: MapData) {
  for (let y=0; y<map.height; y++) for (let x=0; x<map.width; x++) {
    const type = map.tiles[y][x]
    const color = TILE_COLORS[type] ?? 0x999999
    scene.add.rectangle(
      x*TILE_SIZE + TILE_SIZE/2,
      y*TILE_SIZE + TILE_SIZE/2,
      TILE_SIZE, TILE_SIZE, color
    )
  }
}