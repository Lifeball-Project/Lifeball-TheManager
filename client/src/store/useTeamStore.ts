import { create } from 'zustand';
import { Player } from '@/types/player/player';

interface TeamState {
  team: Player[] | null;
  setTeam: (team: Player[]) => void;
  resetTeam: () => void;
}

export const useTeamStore = create<TeamState>((set) => ({
  team: null,
  setTeam: (team) => set({ team }),
  resetTeam: () => set({ team: null }),
}));