import { BackgroundWrapper } from "05_ui/BackgroundWrapper";
import { SetupStepManager } from "./components/StepManager";

export function SetupScene() {
  return (
      <BackgroundWrapper >
        <SetupStepManager />
      </BackgroundWrapper>
  );
}