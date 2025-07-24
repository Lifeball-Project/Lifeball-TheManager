import { SetupStepManager } from '@/features/initialsetup/components/SetupStepManager';

export function SetupScene() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SetupStepManager />
    </div>
  );
}