'use client';

import { BackgroundWrapper } from "@/components/BackgroundWrapper.tsx";
import { SetupStepManager } from "@/features/initialsetup/components/SetupStepManager";

export default function InitialSetupPage() {
  return <BackgroundWrapper><SetupStepManager /></BackgroundWrapper>;
}