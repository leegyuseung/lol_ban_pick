import { FormsData } from '@/types/types';
import { create } from 'zustand';

type RulesState = {
  blueTeam: string;
  redTeam: string;
  banpickMode: 'tournament' | 'peerless';
  peopleMode: 'solo' | 'one' | 'five';
  timeUnlimited?: boolean;
  teamSide?: 'red' | 'blue' | 'solo';
  setRules: (data: FormsData) => void;
};

export const useRulesStore = create<RulesState>((set) => ({
  blueTeam: '블루팀',
  redTeam: '레드팀',
  banpickMode: 'tournament',
  peopleMode: 'solo',
  timeUnlimited: true,
  teamSide: 'solo',
  setRules: (data: FormsData) =>
    set({
      blueTeam: data.blueTeam != '' ? data.blueTeam : '블루팀',
      redTeam: data.redTeam != '' ? data.redTeam : '레드팀',
      banpickMode: data.banpickMode,
      peopleMode: data.peopleMode,
      timeUnlimited: data.peopleMode != 'solo' ? false : data.timeUnlimited,
      teamSide: data.peopleMode == 'solo' ? 'solo' : data.teamSide,
    }),
}));
