import { create } from 'zustand';

type MapType = 'world' | 'house' | 'stadium';

interface MapState {
  currentMap: MapType;
  setMap: (map: MapType) => void;
}

export const useMapStore = create<MapState>((set) => ({
  currentMap: 'world',
  setMap: (map) => set({ currentMap: map }),
  exitMap: () => set({ currentMap: 'world' }),
}));