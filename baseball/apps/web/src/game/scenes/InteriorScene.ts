// import Phaser from 'phaser'
// import overworld from '../maps/data/world.json'
// import { TILE_SIZE } from '../constants/tiles'
// import { createTiles, type MapData } from '../maps/createTiles'
// import { createCharacter } from '../characters/createCharacter'
// import { createMoveKeys, type MoveKeys } from '../characters/key'
// import { handleCharacterMove } from '../characters/handleCharacterMove'
// import { setupTopDownCamera } from '../systems/camera/setupTopDownCamera'

// export class InteriorScene extends Phaser.Scene {
//   private actor!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
//   private keys!: MoveKeys

//   constructor() { super({ key: 'InteriorScene' }) }

//   create(data: { mapKey?: string, from?: string }) {
//     const map = overworld as MapData // 임시: 내부 맵 생기면 교체
//     const mapW = map.width * TILE_SIZE, mapH = map.height * TILE_SIZE
//     this.physics.world.setBounds(0,0,mapW,mapH)

//     createTiles(this, map)
//     this.actor = createCharacter(this, mapW/2, mapH - TILE_SIZE)
//     this.keys = createMoveKeys(this)
//     setupTopDownCamera(this, mapW, mapH, { padding: 0.1, follow: this.actor })

//     const tip = this.add.text(12,12,'위쪽 가장자리에서 Space: 나가기', { color:'#fff' }).setScrollFactor(0)
//     this.events.on(Phaser.Scenes.Events.UPDATE, () => {
//       const atTop = this.actor.y < TILE_SIZE*1.2
//       if (atTop && Phaser.Input.Keyboard.JustDown(this.keys.space)) {
//         this.scene.start(data?.from ?? 'OverworldScene')
//       }
//     })
//   }

//   update() { if (this.actor) handleCharacterMove(this.actor, this.keys) }
// }