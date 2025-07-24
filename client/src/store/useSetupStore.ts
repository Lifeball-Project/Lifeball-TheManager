import { create } from 'zustand';
import { Step } from '@/types/step/step-types';

interface SetupState {
  playerName: string;
  currentStep: Step;
  setPlayerName: (name: string) => void;
  setRegion: (region: string) => void;
  goToNextStep: () => void;
}

export const useSetupStore = create<SetupState>((set, get) => ({
  playerName: '',
  currentStep: 'playerName',
  setPlayerName: (name) => set({ playerName: name }),
  setRegion: (region) => {
    // 여기에 지역 설정 로직을 추가할 수 있습니다.
    console.log(`Selected region: ${region}`);
  },
  goToNextStep: () => {
    const steps: Step[] = ['playerName', 'lore', 'region', 'team'];
    const currentIndex = steps.indexOf(get().currentStep);
    const nextStep = steps[currentIndex + 1] || 'team';
    set({ currentStep: nextStep });
  },
}));