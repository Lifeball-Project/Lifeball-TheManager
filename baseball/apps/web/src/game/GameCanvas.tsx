import { useEffect, useRef } from 'react'
import * as Phaser from 'phaser'

// 테스트용 Scene
class TestScene extends Phaser.Scene {
  create() {
    console.log('[TestScene] create 실행됨')
    const { width, height } = this.scale

    // 화면 정중앙에 빨간 네모
    this.add.rectangle(width / 2, height / 2, 50, 50, 0xff0000)
  }
}

export function GameCanvas() {
  // Phaser가 붙을 DOM을 ref로 관리
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return

    // Phaser 초기화
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: containerRef.current as HTMLElement, // DOM 직접 전달
      backgroundColor: '#111827',
      scene: [TestScene],
      scale: {
        mode: Phaser.Scale.RESIZE,          // 부모 div 크기에 맞춤
        autoCenter: Phaser.Scale.CENTER_BOTH, // 화면 중앙 정렬
      },
    })

    gameRef.current = game

    // cleanup
    return () => {
      game.destroy(true)
      gameRef.current = null
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen bg-black"
    />
  )
}