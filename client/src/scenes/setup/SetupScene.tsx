import { BackgroundWrapper } from '@/components/BackgroundWrapper.tsx';
import { SetupStepManager } from '@/features/setup/components/StepManager';

export function SetupScene() {
  return (
      <BackgroundWrapper >
        <SetupStepManager />
      </BackgroundWrapper>
  );
}