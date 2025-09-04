import Phaser from 'phaser'
export function createCharacter(scene: Phaser.Scene, x: number, y: number, key='__director__') {
  if (!scene.textures.exists(key)) {
    const g = scene.add.graphics().fillStyle(0x00d4ff, 1).fillRect(0,0,16,16)
    g.generateTexture(key, 16, 16); g.destroy()
  }
  const s = scene.physics.add.sprite(x, y, key)
  s.setCollideWorldBounds(true)
  return s
}