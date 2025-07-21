import { useSetupStore } from "@/store/setupStore";
import { PlayerNameForm } from "./steps/PlayerNameForm";
import { GameLoreDialog } from "./steps/GameLoreDialog";
import { RegionSelector } from "./steps/RegionSelector";
import { TeamSetup } from "./steps/TeamSetup";


export function SetupStepManager() {
  const step = useSetupStore((state) => state.currentStep);

  return (
    <>
      {step === 'playerName' && <PlayerNameForm />}
      {step === 'lore' && <GameLoreDialog />}
      {step === 'region' && <RegionSelector />}
      {step === 'team' && <TeamSetup />}
      {/* ...다른 단계 조건 */}
    </>
  );
}