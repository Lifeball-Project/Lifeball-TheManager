import Phaser from 'phaser'
export function setupTopDownCamera(scene: Phaser.Scene, mapW: number, mapH: number, opts: { padding?: number, follow?: any } = {}) {
  const cam = scene.cameras.main
  const padding = opts.padding ?? 0.1
  cam.setBounds(0,0,mapW,mapH); cam.roundPixels = true
  const fit = () => {
    const z = Math.min(scene.scale.width/mapW, scene.scale.height/mapH) * (1 - padding)
    cam.setZoom(z); cam.centerOn(mapW/2, mapH/2)
    if (opts.follow) cam.startFollow(opts.follow, true, 0.15, 0.15)
  }
  fit()
  scene.scale.on('resize', fit)
}