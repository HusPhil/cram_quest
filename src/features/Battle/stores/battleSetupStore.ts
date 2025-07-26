import { create } from 'zustand';
import { QuestRead } from '../../../services/api/schema/quest_schema';
import { SubjectRead } from '../../../services/api/schema/subject_schema';
import { TaskRead } from '../../../services/api/schema/task_schema';
import { subscribeWithSelector } from 'zustand/middleware';

export interface BattleSetupStep {
	id: string;
	description: string;
}

interface BattleSetupState {
	// State
	isBattleActive: boolean;
	battleResult: 'defeat' | 'victory' | null;
	selectedQuest: QuestRead | null;
	selectedSubject: SubjectRead | null;
	questSteps: BattleSetupStep[];
	generatedTasks: TaskRead[];
	battleSessionId: number | null;
	durationMinutes: number;
	enemyName: string | null;

	// Actions
	selectQuest: (quest: QuestRead) => void;
	setEnemyName: (name: string) => void;
	selectSubject: (subject: SubjectRead) => void;
	addQuestStep: (step: string) => string;
	removeQuestStep: (id: string) => void;
	setGeneratedTasks: (tasks: TaskRead[]) => void;
	updateQuestStep: (id: string, description: string) => void;
	setDuration: (minutes: number) => void;
	setBattleSessionId: (id: number) => void;
	setIsBattleActive: (isActive: boolean) => void;
	setBattleResult: (result: 'defeat' | 'victory' | null) => void;
	resetBattleSetup: () => void;

	// Derived
	canStartBattle: () => boolean;
	getCleanedQuestSteps: () => string[];
}

export const useBattleSetupStore = create<BattleSetupState>()(
	subscribeWithSelector((set, get) => ({
		// Initial state
		battleSessionId: null,
		isBattleActive: false,
		battleResult: null,
		selectedSubject: null,
		selectedQuest: null,
		questSteps: [],
		generatedTasks: [],
		durationMinutes: 3,
		enemyName: null,

		// Actions
		selectQuest: (quest: QuestRead) =>
			set(() => ({ selectedQuest: quest })),

		setEnemyName: (name: string) => set({ enemyName: name }),

		selectSubject: (subject: SubjectRead) =>
			set({ selectedSubject: subject }),

		addQuestStep: (description: string) => {
			const newStepId = Date.now().toString();
			const newStep = { id: newStepId, description };
			set((state) => ({
				questSteps: [...state.questSteps, newStep],
			}));
			return newStepId;
		},

		removeQuestStep: (id: string) =>
			set((s) => ({
				questSteps: s.questSteps.filter((step) => step.id !== id),
			})),

		setGeneratedTasks: (tasks: TaskRead[]) =>
			set({ generatedTasks: tasks }),

		updateQuestStep: (id: string, description: string) =>
			set((s) => ({
				questSteps: s.questSteps.map((step) =>
					step.id === id ? { ...step, description } : step
				),
			})),

		setDuration: (minutes) =>
			set(() => ({
				durationMinutes: minutes,
			})),

		setBattleSessionId: (id) => {
			set(() => ({
				battleSessionId: id,
			}));
		},

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
				battleSessionId: null,
				durationMinutes: 3,
			})),

		// Derived state functions
		canStartBattle: () => {
			const { selectedQuest, questSteps, durationMinutes } = get();
			return (
				!!selectedQuest && questSteps.length > 0 && durationMinutes > 0
			);
		},

		getCleanedQuestSteps: () => {
			const { questSteps } = get();
			return questSteps
				.filter((step) => step.description.trim() !== '')
				.map((step) => step.description);
		},
	}))
);
