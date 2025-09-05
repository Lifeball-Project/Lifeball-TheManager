import { create } from 'zustand';
import { Scene } from '07_types/scene/scene-types';

interface SceneStore {
  currentScene: Scene;
  setScene: (scene: Scene) => void;
}

export const useSceneStore = create<SceneStore>((set) => ({
  currentScene: 'start',
  setScene: (scene) => set({ currentScene: scene }),
}));