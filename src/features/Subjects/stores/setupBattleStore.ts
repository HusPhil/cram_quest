import { create } from 'zustand';
import { QuestRead } from '../../../services/api/schema/quest_schema';
import { SetupBattleStep } from '../components/Modals/StartBattleModal';


interface SetupBattleState {
  // State
  isBattleActive: boolean;
  selectedQuest: QuestRead | null;
  questSteps: string[];
  durationMinutes: number;

  // Actions
  selectQuest: (quest: QuestRead) => void;
  addQuestStep: (step: string) => void;
  removeQuestStep: (index: number) => void;
  updateQuestStep: (index: number, step: string) => void;
  setDuration: (minutes: number) => void;
  setIsBattleActive: (isActive: boolean) => void;
  resetSetup: () => void;

  // Derived
  canStartBattle: () => boolean;
  getCleanedQuestSteps: () => string[];
}

export const useSetupBattleStore = create<SetupBattleState>((set, get) => ({
  isBattleActive: false,
  selectedQuest: null,
  questSteps: [],
  durationMinutes: 30,

  selectQuest: (quest: QuestRead) =>
    set(() => ({ selectedQuest: quest})),

  addQuestStep: (step: string) =>
    set((state) => ({
      questSteps: [...state.questSteps, step],
    })),

  removeQuestStep: (index: number) =>
    set((state) => ({
      questSteps: state.questSteps.filter((_, i) => i !== index),
    })),

  updateQuestStep: (index: number, step: string) =>
    set((state) => {
      const newSteps = [...state.questSteps];
      newSteps[index] = step;
      return { questSteps: newSteps };
    }),

  setDuration: (minutes) =>
    set(() => ({
      durationMinutes: minutes,
    })),

  setIsBattleActive: (isActive) =>
    set(() => ({
      isBattleActive: isActive,
    })),

  resetSetup: () =>
    set(() => ({
      selectedTaskId: null,
      taskTitle: '',
      questSteps: [],
      durationMinutes: 25,
    })),

 canStartBattle: () => {
  const { selectedQuest, questSteps, durationMinutes } = get();
  return !!selectedQuest && questSteps.length > 0 && durationMinutes > 0;
},

getCleanedQuestSteps: () => {
  const { questSteps } = get();
  return questSteps.filter((step) => step.trim() !== '');
},

}));
