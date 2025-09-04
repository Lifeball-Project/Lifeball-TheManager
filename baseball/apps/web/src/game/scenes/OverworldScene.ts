import Phaser from 'phaser'
import overworld from '../maps/data/world.json'
import { TILE_SIZE } from '../constants/tiles'
import { type MapData, createTiles } from '../maps/createTiles'
import { createCharacter } from '../characters/createCharacter'
import {type MoveKeys, createMoveKeys } from '../characters/key'
import { handleCharacterMove } from '../characters/handleCharacterMove'
import { createBuildings } from '../buildings/createBuildings'
import { setupBuildingInteraction } from '../buildings/buildingInteraction'
import { type BuildingData } from '../buildings/building-types'
import { setupTopDownCamera } from '../systems/camera/setupTopDownCamera'

export class OverworldScene extends Phaser.Scene {
  private actor!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  private keys!: MoveKeys

  constructor() { super({ key: 'OverworldScene' }) }

  create() {
    const map = overworld as MapData
    const mapW = map.width * TILE_SIZE, mapH = map.height * TILE_SIZE
    this.physics.world.setBounds(0,0,mapW,mapH)

    createTiles(this, map)
    this.actor = createCharacter(this, mapW/2, mapH/2)
    this.keys = createMoveKeys(this)
    setupTopDownCamera(this, mapW, mapH, { padding: 0.1, follow: this.actor })

    const buildings: BuildingData[] = [
      { id:'houseA', x: 8*TILE_SIZE, y: 8*TILE_SIZE, width: 3*TILE_SIZE, height: 2*TILE_SIZE,
        enterSceneKey:'InteriorScene', enterMapKey:'houseA', prompt:'스페이스: 집 들어가기' }
    ]
    const group = createBuildings(this, buildings)
    setupBuildingInteraction(this, this.actor, group, this.keys)

    const hint = this.add.text(12,12,'', { color:'#fff' }).setScrollFactor(0)
    this.events.on('hint', (msg:string)=> hint.setText(msg))
  }

  update() { if (this.actor) handleCharacterMove(this.actor, this.keys) }
}