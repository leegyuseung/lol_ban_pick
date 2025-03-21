import { FormsData, RulesState, RulesType } from '@/types/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useRulesStore = create<RulesState>()(
  persist(
    (set) => ({
      banpickMode: 'tournament',
      peopleMode: 'solo',
      timeUnlimited: 'true',
      nowSet: 1,
      role: 'host',
      position: 'blue',
      blueTeamName: '블루팀',
      redTeamName: '레드팀',
      hostInfo: {
        myTeam: '',
        yourTeam: '',
        myTeamSide: 'blue',
        yourTeamSide: 'red',
        myImg: '',
        yourImg: '',
      },

      guestInfo: {
        myTeam: '',
        yourTeam: '',
        myTeamSide: 'red',
        yourTeamSide: 'blue',
        myImg: '',
        yourImg: '',
      },

      setRules: (data: RulesType) =>
        set({
          banpickMode: data.banpickMode,
          peopleMode: data.peopleMode,
          timeUnlimited: data.peopleMode === 'solo' ? data.timeUnlimited : 'true',
          role: data.role,
          position: data.position,
        }),

      setFormRules: (data: FormsData) =>
        set({
          banpickMode: data.banpickMode,
          peopleMode: data.peopleMode,
          timeUnlimited: data.peopleMode === 'solo' ? data.timeUnlimited : 'true',
          role: 'host',
          position: data.myTeamSide,
        }),

      setHostRules: (data: FormsData) =>
        set((state) => ({
          ...state,
          hostInfo: {
            myTeam:
              data.myTeam ||
              (data.myTeamSide === 'blue' ? data.blueTeamName || '블루팀' : data.redTeamName || '레드팀'),

            yourTeam:
              data.yourTeam ||
              (data.myTeamSide === 'blue' ? data.redTeamName || '레드팀' : data.blueTeamName || '블루팀'),
            myTeamSide: data.myTeamSide === 'blue' ? 'blue' : 'red',
            yourTeamSide: data.myTeamSide === 'blue' ? 'red' : 'blue',
            myImg: data.myTeamSide === 'blue' ? data.blueImg : data.redImg,
            yourImg: data.myTeamSide === 'blue' ? data.redImg : data.blueImg,
          },
        })),

      setGuestRules: (data: FormsData) =>
        set((state) => ({
          ...state,
          guestInfo: {
            myTeam:
              data.myTeam ||
              (data.myTeamSide === 'blue' ? data.blueTeamName || '블루팀' : data.redTeamName || '레드팀'),

            yourTeam:
              data.yourTeam ||
              (data.myTeamSide === 'blue' ? data.redTeamName || '레드팀' : data.blueTeamName || '블루팀'),
            myTeamSide: data.myTeamSide === 'blue' ? 'blue' : 'red',
            yourTeamSide: data.myTeamSide === 'blue' ? 'red' : 'blue',
            myImg: data.myTeamSide === 'blue' ? data.blueImg : data.redImg,
            yourImg: data.myTeamSide === 'blue' ? data.redImg : data.blueImg,
          },
        })),

      setPeerlessSet: () =>
        set((state) => {
          return { nowSet: state.nowSet + 1 };
        }),

      setClearPeerlessSet: () =>
        set(() => {
          localStorage.removeItem('rules-store');
          return { nowSet: 1 };
        }),
    }),
    { name: 'rules-store' },
  ),
);
