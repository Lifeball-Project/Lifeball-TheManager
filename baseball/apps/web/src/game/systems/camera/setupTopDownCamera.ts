import Phaser from 'phaser'

/**
 * Center the view using the camera (recommended) — tiles render from (0,0) with no offsets.
 * - First centers on the map midpoint (configurable)
 * - Optionally follows a target (start on next tick to preserve initial centering)
 * - Recomputes zoom on resize; while following, avoids jumping and only updates deadzone
 */
export function setupTopDownCamera(
  scene: Phaser.Scene,
  mapW: number,
  mapH: number,
  opts: {
    padding?: number
    follow?: Phaser.GameObjects.GameObject
    deadzoneRatio?: number
    initialCenter?: 'map' | 'follow'
  } = {}
) {
  const cam = scene.cameras.main
  const padding = opts.padding ?? 0.1
  const deadzoneRatio = opts.deadzoneRatio ?? 0.3
  const initialCenter = opts.initialCenter ?? 'map'

  cam.setBounds(0, 0, mapW, mapH)
  cam.roundPixels = true

  let initialized = false

  const fit = (size?: Phaser.Structs.Size) => {
    const vw = size ? size.width : scene.scale.width
    const vh = size ? size.height : scene.scale.height
    const zoom = Math.min(vw / mapW, vh / mapH) * (1 - padding)

    cam.setZoom(zoom)

    if (!initialized) {
      // Initial placement
      if (opts.follow && initialCenter === 'follow') {
        const t = opts.follow as any
        cam.centerOn(t.x, t.y)
      } else {
        cam.centerOn(mapW / 2, mapH / 2)
      }

      // Defer startFollow to next tick so the initial center is visible at least once
      if (opts.follow) {
        scene.events.once(Phaser.Scenes.Events.UPDATE, () => {
          cam.startFollow(opts.follow as any, true, 0.15, 0.15)
          cam.setDeadzone(vw * deadzoneRatio, vh * deadzoneRatio)
        })
      }

      initialized = true
      return
    }

    // On resize
    if (opts.follow) {
      // Keep current focus; just update deadzone to new viewport
      cam.setDeadzone(vw * deadzoneRatio, vh * deadzoneRatio)
    } else {
      cam.centerOn(mapW / 2, mapH / 2)
    }
  }

  fit()
  scene.scale.on('resize', (gameSize: Phaser.Structs.Size) => fit(gameSize))
}