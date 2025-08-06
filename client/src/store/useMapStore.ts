import { create } from 'zustand';

type MapType = 'default' | 'house' | 'stadium' | 'exit';

interface MapState {
  currentMap: MapType;
  setMap: (map: MapType) => void;
  exitMap: () => void;
}

export const useMapStore = create<MapState>((set) => ({
  currentMap: 'default',
  setMap: (map) => set({ currentMap: map }),
  exitMap: () => set({ currentMap: 'default' }),
}));