import { create } from 'zustand';

type Scene = 'start' | 'setup' | 'game';

interface SceneStore {
  currentScene: Scene;
  setScene: (scene: Scene) => void;
}

export const useSceneStore = create<SceneStore>((set) => ({
  currentScene: 'start',
  setScene: (scene) => set({ currentScene: scene }),
}));