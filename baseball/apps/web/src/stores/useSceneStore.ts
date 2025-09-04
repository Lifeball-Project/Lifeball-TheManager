import { create } from 'zustand';
import type { Scene } from '@/types/scene/scene.type';

interface SceneStore {
  currentScene: Scene;
  setScene: (scene: Scene) => void;
}

export const useSceneStore = create<SceneStore>((set) => ({
  currentScene: 'start',
  setScene: (scene) => set({ currentScene: scene }),
}));