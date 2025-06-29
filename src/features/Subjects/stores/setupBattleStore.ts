import { create } from 'zustand';
import { QuestRead } from '../../../services/api/schema/quest_schema';
import { SetupBattleStep } from '../components/Modals/StartBattleModal';
import { SubjectRead } from '../../../services/api/schema/subject_schema';
import { TaskRead } from '../../../services/api/schema/task_schema';

interface SetupBattleState {
	// State
	isBattleActive: boolean;
	battleResult: 'defeat' | 'victory' | null;
	selectedQuest: QuestRead | null;
	selectedSubject: SubjectRead | null;
	questSteps: string[];
	generatedTasks: TaskRead[];
	durationMinutes: number;

	// Actions
	selectQuest: (quest: QuestRead) => void;
	addQuestStep: (step: string) => void;
	removeQuestStep: (index: number) => void;
	setGeneratedTasks: (tasks: TaskRead[]) => void;
	updateQuestStep: (index: number, step: string) => void;
	setDuration: (minutes: number) => void;
	setIsBattleActive: (isActive: boolean) => void;
	setBattleResult: (result: 'defeat' | 'victory' | null) => void;
	resetBattleSetup: () => void;

	// Derived
	canStartBattle: () => boolean;
	getCleanedQuestSteps: () => string[];
}

export const useSetupBattleStore = create<SetupBattleState>((set, get) => ({
	isBattleActive: false,
	battleResult: null,
	selectedSubject: null,
	selectedQuest: null,
	questSteps: [],
	generatedTasks: [],
	durationMinutes: 3,

	selectQuest: (quest: QuestRead) => set(() => ({ selectedQuest: quest })),
	selectSubject: (subject: SubjectRead) => set({ selectedSubject: subject }),

	addQuestStep: (step: string) =>
		set((state) => ({
			questSteps: [...state.questSteps, step],
		})),

	removeQuestStep: (index: number) =>
		set((state) => ({
			questSteps: state.questSteps.filter((_, i) => i !== index),
		})),

	setGeneratedTasks: (tasks: TaskRead[]) => set({ generatedTasks: tasks }),

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

	setBattleResult: (result) => set(() => ({ battleResult: result })),

	resetBattleSetup: () =>
		set(() => ({
			isBattleActive: false,
			battleResult: null,
			selectedQuest: null,
			selectedSubject: null,
			questSteps: [],
			generatedTasks: [],
			durationMinutes: 3,
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
