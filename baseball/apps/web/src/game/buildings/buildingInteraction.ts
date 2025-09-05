// import Phaser from 'phaser'
// import type { MoveKeys } from '../characters/key'
// import type { BuildingData } from './building-types'

// export function setupBuildingInteraction(
//   scene: Phaser.Scene,
//   actor: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
//   buildingGroup: Phaser.Physics.Arcade.StaticGroup,
//   keys: MoveKeys
// ) {
//   let overlapped: BuildingData | null = null

//   scene.physics.add.overlap(actor, buildingGroup, (_a, r: any) => {
//     overlapped = (r as any).__building as BuildingData
//     scene.events.emit('hint', overlapped?.prompt ?? '스페이스: 들어가기')
//   })

//   scene.events.on(Phaser.Scenes.Events.UPDATE, () => {
//     if (overlapped && Phaser.Input.Keyboard.JustDown(keys.space)) {
//       scene.scene.start(overlapped.enterSceneKey, { mapKey: overlapped.enterMapKey, from: scene.scene.key })
//     }
//     overlapped = null
//   })
// }