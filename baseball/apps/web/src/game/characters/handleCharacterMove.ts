import Phaser from 'phaser'
import { type MoveKeys, getMoveState } from '../characters/key'

export function handleCharacterMove(
  actor: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
  keys: MoveKeys,
  speed = 160
) {
  const body = actor.body as Phaser.Physics.Arcade.Body
  body.setVelocity(0)
  const { left, right, up, down } = getMoveState(keys)
  if (left) body.setVelocityX(-speed); else if (right) body.setVelocityX(speed)
  if (up)   body.setVelocityY(-speed); else if (down)  body.setVelocityY(speed)
  if (body.velocity.lengthSq() > 0) body.velocity.normalize().scale(speed)
}