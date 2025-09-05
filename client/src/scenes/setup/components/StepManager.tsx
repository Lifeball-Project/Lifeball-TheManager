import { useSetupStore } from "@/store/useSetupStore";
import { PlayerNameStep } from "./steps/PlayerNameStep";
import { GameLoreStep } from "./steps/GameLoreStep";
import { RegionSelectStep } from "./steps/RegionSelectStep";
import { TeamSetupStep } from "./steps/TeamSetupStep";


export function SetupStepManager() {
  const step = useSetupStore((state) => state.currentStep);

  return (
    <>
      {step === 'playerName' && <PlayerNameStep />}
      {step === 'lore' && <GameLoreStep />}
      {step === 'region' && <RegionSelectStep />}
      {step === 'team' && <TeamSetupStep />}
      {/* ...다른 단계 조건 */}
    </>
  );
}