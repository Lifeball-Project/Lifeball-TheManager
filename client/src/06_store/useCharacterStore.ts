import { create } from 'zustand';
import * as THREE from 'three';

interface CharacterState {
  character: THREE.Mesh | null;
  setCharacter: (mesh: THREE.Mesh) => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  character: null,
  setCharacter: (mesh) => set({ character: mesh }),
}));