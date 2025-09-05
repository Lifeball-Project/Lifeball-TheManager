import Phaser from 'phaser'
import { useEffect, useRef } from 'react'
import { createPhaserConfig } from './config/phaserConfig'
import { OverworldScene } from './scenes/OverworldScene'
// import { InteriorScene } from './scenes/InteriorScene'

export function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const game = new Phaser.Game(
      createPhaserConfig({
        parent: containerRef.current,
        scenes: [OverworldScene],   // 사용할 씬 전달
        debug: false,
      })
    )

    return () => game.destroy(true)
  }, [])

  return <div ref={containerRef} className="w-screen h-screen" />
}