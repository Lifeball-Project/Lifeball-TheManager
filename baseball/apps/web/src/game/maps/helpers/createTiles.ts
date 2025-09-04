import * as Phaser from 'phaser'
import type { MapData } from '@/types/map/map-types'

const TILE_SIZE = 32

// 각 타일 타입별 색상 정의 (임시)
const tileColors: Record<string, number> = {
  grass: 0x3a913f,
  dirt: 0x8d6e63,
  water: 0x4fc3f7,
}

export function createTiles(scene: Phaser.Scene, mapData: MapData) {
  const tiles: Phaser.GameObjects.Rectangle[] = []

  // 맵 전체 크기
  const mapWidthPx = mapData.width * TILE_SIZE
  const mapHeightPx = mapData.height * TILE_SIZE

  // 화면 중앙에 맵을 위치시키기 위한 오프셋
  const offsetX = scene.scale.width / 2 - mapWidthPx / 2
  const offsetY = scene.scale.height / 2 - mapHeightPx / 2

  for (let y = 0; y < mapData.height; y++) {
    for (let x = 0; x < mapData.width; x++) {
      const type = mapData.tiles[y][x]
      const color = tileColors[type] ?? 0x000000

      const tile = scene.add.rectangle(
        offsetX + x * TILE_SIZE + TILE_SIZE / 2,
        offsetY + y * TILE_SIZE + TILE_SIZE / 2,
        TILE_SIZE,
        TILE_SIZE,
        color
      )
      tiles.push(tile)
    }
  }

  return tiles
}