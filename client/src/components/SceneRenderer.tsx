import { useSceneStore } from '@/store/useSceneStore';
import { StartScene } from '@/scenes/start/StartScene';
import { SetupScene } from '@/scenes/setup/SetupScene';
import { GameScene } from '@/scenes/game/GameScene';

export function SceneRenderer() {
  const currentScene = useSceneStore((s) => s.currentScene);

  switch (currentScene) {
    case 'start':
      return <StartScene />;
    case 'setup':
      return <SetupScene />;
    case 'game':
      return <GameScene />;
    default:
      return <div>잘못된 Scene입니다.</div>;
  }
}