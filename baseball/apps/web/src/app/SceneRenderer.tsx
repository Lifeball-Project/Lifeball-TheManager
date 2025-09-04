import { useSceneStore } from '@/stores/useSceneStore'

// 시작 컨테이너
import { StartContainer } from '@/ui/start/StartContainer'

// 셋업
import { SetupContainer } from '@/ui/setup/SetupContainer'

// 게임
import { GameCanvas } from '@/game/GameCanvas'

export function SceneRenderer() {
  const currentScene = useSceneStore((s) => s.currentScene)

  switch (currentScene) {
    case 'start':
      return <StartContainer />

    case 'setup':
      return <SetupContainer />

    case 'game':
      return <GameCanvas />

    default:
      return <div className="text-center text-red-500 p-6">잘못된 Scene입니다.</div>
  }
}