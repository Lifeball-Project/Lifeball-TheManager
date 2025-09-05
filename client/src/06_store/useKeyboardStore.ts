import { create } from 'zustand';

interface KeyboardState {
  pressedKeys: Set<string>;
  addKey: (key: string) => void;
  removeKey: (key: string) => void;
  resetKeys: () => void;
}

export const useKeyboardStore = create<KeyboardState>((set) => ({
  pressedKeys: new Set(),

  addKey: (key) =>
    set((state) => {
      const updated = new Set(state.pressedKeys);
      updated.add(key.toLowerCase());
      return { pressedKeys: updated };
    }),

  removeKey: (key) =>
    set((state) => {
      const updated = new Set(state.pressedKeys);
      updated.delete(key.toLowerCase());
      return { pressedKeys: updated };
    }),

  resetKeys: () => set({ pressedKeys: new Set() }),
}));