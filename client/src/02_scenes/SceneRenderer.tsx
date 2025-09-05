import { useSceneStore } from "06_store/useSceneStore";
import { StartScene } from "./start/StartScene";
import { SetupScene } from "./setup/SetupScene";
import { GameScene } from "./game/GameScene";


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