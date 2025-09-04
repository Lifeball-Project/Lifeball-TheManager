import Phaser from 'phaser'
export type MoveKeys = {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
  wasd: { [k in 'W'|'A'|'S'|'D']: Phaser.Input.Keyboard.Key }
  space: Phaser.Input.Keyboard.Key
}
export function createMoveKeys(scene: Phaser.Scene): MoveKeys {
  return {
    cursors: scene.input.keyboard!.createCursorKeys(),
    wasd: scene.input.keyboard!.addKeys('W,A,S,D') as any,
    space: scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
  }
}
export function getMoveState(keys: MoveKeys) {
  const left  = keys.cursors.left?.isDown  || keys.wasd.A?.isDown
  const right = keys.cursors.right?.isDown || keys.wasd.D?.isDown
  const up    = keys.cursors.up?.isDown    || keys.wasd.W?.isDown
  const down  = keys.cursors.down?.isDown  || keys.wasd.S?.isDown
  return { left, right, up, down, space: keys.space.isDown }
}