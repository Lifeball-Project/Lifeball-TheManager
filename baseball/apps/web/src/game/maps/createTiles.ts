import Phaser from 'phaser'
import { TILE_SIZE } from '../constants/tiles'
import { makeGroundTexture } from '../utils/placeholderArt';
export type MapData = { width: number; height: number; tiles: string[][] }

export function createTiles(scene: Phaser.Scene, map: MapData) {
  const mapW = map.width * TILE_SIZE

  const VIS_H = Math.floor(TILE_SIZE * 0.75)
  const mapHVisual = map.height * VIS_H

  const container = scene.add.container(0, 0)

  const texKey = makeGroundTexture(scene)
  // 보이는 높이
  // 2) 타일은 (0,0) 기준으로 컨테이너 안에 추가(오프셋 X)
  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      const img = scene.add.image(
        x * TILE_SIZE + TILE_SIZE / 2,
        y * VIS_H + VIS_H,
        texKey
      ).setOrigin(0.5, 1)
      container.add(img)
    }
  }

  const centerContainer = (vw: number, vh: number) => {
    container.setPosition((vw - mapW) / 2, (vh - mapHVisual) / 2)
  }

  const vw = scene.scale?.width || scene.cameras.main.width
  const vh = scene.scale?.height || scene.cameras.main.height
  centerContainer(vw, vh)

  // 4) 창 크기 변경 시 재중앙
  scene.scale.on('resize', (size: Phaser.Structs.Size) => {
    centerContainer(size.width, size.height)
  })

  return container
}