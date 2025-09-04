import Phaser from 'phaser'

export class PreloadScene extends Phaser.Scene {
  constructor() { super('Preload') }
  preload() {
    // 예: this.load.image('tile-grass', '/assets/tiles/grass.png')
    // 스프라이트시트/오디오도 여기서 로드
  }
  create() { this.scene.start('Main') }
}