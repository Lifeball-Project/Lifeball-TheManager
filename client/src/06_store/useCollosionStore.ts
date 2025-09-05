import { create } from 'zustand';

interface CollisionState {
  buildingId: string | null;
  setBuildingId: (id: string | null) => void;
}

export const useCollisionStore = create<CollisionState>((set) => ({
  buildingId: null,
  setBuildingId: (id) => set({ buildingId: id }),
}));