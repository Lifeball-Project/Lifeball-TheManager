import Phaser from 'phaser'

export function makeGroundTexture(scene: Phaser.Scene, key='__ground_trap__', w=32, h=24) {
  if (scene.textures.exists(key)) return key
  const g = scene.add.graphics()
  g.fillStyle(0x8b4513, 1) // dirt
  // 사다리꼴: 위 좁고 아래 넓게
  const pad = Math.floor(w * 0.18)
  g.beginPath()
  g.moveTo(pad, 0)
  g.lineTo(w - pad, 0)
  g.lineTo(w, h)
  g.lineTo(0, h)
  g.closePath()
  g.fillPath()
  g.generateTexture(key, w, h)
  g.destroy()
  return key
}

export function makeBuildingTexture(scene: Phaser.Scene, key='__bldg__', w=48, h=64) {
  if (scene.textures.exists(key)) return key
  const g = scene.add.graphics()
  // 그림자(바닥)
  g.fillStyle(0x000000, 0.15).fillRect((w-32)/2, h-10, 32, 8)
  // 본체(앞쪽이 조금 넓은 사각형 느낌)
  g.fillStyle(0x777777, 1).fillRect((w-32)/2, h-52, 32, 44)
  // 지붕
  g.fillStyle(0x555555, 1).fillRect((w-34)/2, h-60, 34, 10)
  g.generateTexture(key, w, h)
  g.destroy()
  return key
}