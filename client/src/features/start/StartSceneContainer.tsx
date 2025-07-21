import { NewGameButton } from "./buttons/NewGameButton";
import { LoadGameButton } from "./buttons/LoadGameButton";
import { SettingsButton } from "./buttons/SettingsButton";
import { ExitGameButton } from "./buttons/ExitGameButton";

export const StartSceneContainer = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="start-scene-container border border-black rounded w-[600px] h-[450px] flex flex-col gap-4 items-center justify-center">
        <h1 className="text-xl font-bold mb-4">야구 게임</h1>
        <NewGameButton />
        <LoadGameButton />
        <SettingsButton />
        <ExitGameButton />
      </div>
    </div>
  );
}