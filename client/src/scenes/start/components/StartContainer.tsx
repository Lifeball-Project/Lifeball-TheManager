import { NewGameButton } from './buttons/NewGameButton';
import { LoadGameButton } from './buttons/LoadGameButton';
import { SettingsButton } from './buttons/SettingsButton';
import { ExitGameButton } from './buttons/ExitGameButton';

export function StartContainer() {

  return (
  
      <div className="min-h-screen flex items-center justify-center">
        <div className="start-scene-container border border-black bg-white rounded w-[600px] h-[500px] flex flex-col gap-10 items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Lifeball: The Manager</h1>
          <NewGameButton />
          <LoadGameButton />
          <SettingsButton />
          <ExitGameButton />
        </div>
      </div>
  );
}