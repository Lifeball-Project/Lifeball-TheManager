import { create } from 'zustand';

export type MapType = 'default' | 'house' | 'stadium' | 'exit';

interface MapState {
  currentMap: MapType;
  setMap: (map: MapType) => void;
  exitMap: () => void;
  setMapByBuilding: (buildingId: string | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  currentMap: 'default',
  setMap: (map) => set({ currentMap: map }),
  exitMap: () => set({ currentMap: 'default' }),
  setMapByBuilding: (buildingId) => {
    if (!buildingId) return;
    if (buildingId === 'house') {
      set({ currentMap: 'house' });
    } else if (buildingId === 'stadium') {
      set({ currentMap: 'stadium' });
    } else if (buildingId === 'exit') {
      set({ currentMap: 'default' });
    }
  },
}));