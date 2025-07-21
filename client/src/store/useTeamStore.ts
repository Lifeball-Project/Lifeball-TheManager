import { create } from 'zustand';
import { Player } from '@/shared/types/player';

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