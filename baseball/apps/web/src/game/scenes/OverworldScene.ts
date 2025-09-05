import Phaser from 'phaser'
import overworld from '../maps/data/world.json'
// import { TILE_SIZE } from '../constants/tiles'
import { type MapData, createTiles } from '../maps/createTiles'
// import { createCharacter } from '../characters/createCharacter'
// import {type MoveKeys, createMoveKeys } from '../characters/key'
// import { handleCharacterMove } from '../characters/handleCharacterMove'
// import { createBuildings } from '../buildings/createBuildings'
// import { setupBuildingInteraction } from '../buildings/buildingInteraction'
// import { type BuildingData } from '../buildings/building-types'
// import { setupTopDownCamera } from '../systems/camera/setupTopDownCamera'

export class OverworldScene extends Phaser.Scene {
  // private actor!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  // private keys!: MoveKeys

  constructor() { super({ key: 'OverworldScene' }) }

  create() {
    const map = overworld as MapData
    createTiles(this, map)

    const cam = this.cameras.main
    cam.setZoom(1.5)
  }
}