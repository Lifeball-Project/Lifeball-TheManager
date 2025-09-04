import Phaser from 'phaser'
import type { BuildingData } from './building-types'

export function createBuildings(scene: Phaser.Scene, list: BuildingData[]) {
  const group = scene.physics.add.staticGroup()
  list.forEach(b => {
    const r = scene.add.rectangle(b.x + b.width/2, b.y + b.height/2, b.width, b.height, 0xffffff, 0.08)
    scene.physics.add.existing(r, true)
    ;(r as any).__building = b
    group.add(r)
  })
  return group
}