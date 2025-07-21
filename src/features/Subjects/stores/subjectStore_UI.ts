import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { MaterialRead } from '../../../services/api/schema/material_schema';
import { QuestRead } from '../../../services/api/schema/quest_schema';
import { SubjectRead } from '../../../services/api/schema/subject_schema';

export type ModalObjectMap = {
	AddNewSubjectModal: never;
	EditSubjectModal: SubjectRead;
	AddNewMaterialModal: never;
	EditMaterialModal: MaterialRead;
	AddNewQuestModal: never;
	StartBattleModal: { objectId: number };
};

export type ModalKey = keyof ModalObjectMap;

export type QuestFilter = 'all' | 'todo' | 'doing' | 'done';

interface SubjectLayoutState {
	activeModal: ModalKey | null;
	activeModalObject: ModalObjectMap[ModalKey] | null;

	questFilters: QuestFilter[];

	subjectQuests: QuestRead[] | null;
}

interface SubjectLayoutActions {
	setActiveModal: <T extends ModalKey>(
		modal: T,
		modalObject?: ModalObjectMap[T]
	) => void;

	closeActiveModal: () => void;

	setSubjectQuests: (quests: QuestRead[]) => void;
	toggleQuestFilter: (filter: QuestFilter) => void;
	clearQuestFilters: () => void;
}

export const useSubjectStore_UI = create<
	SubjectLayoutState & SubjectLayoutActions
>()(
	subscribeWithSelector((set, get) => ({
		activeModal: null,
		activeModalObject: null,

		questFilters: ['todo'],

		subjectQuests: null,

		setActiveModal: (modal, modalObject) =>
			set({
				activeModal: modal,
				activeModalObject: (modalObject ?? null) as any,
			}),

		closeActiveModal: () =>
			set({ activeModal: null, activeModalObject: null }),

		setSubjectQuests: (quests: QuestRead[]) =>
			set({ subjectQuests: quests }),

		toggleQuestFilter: (filter) => {
			const filters = new Set(get().questFilters);
			if (filters.has(filter)) {
				filters.delete(filter);
			} else {
				filters.add(filter);
			}
			set({ questFilters: Array.from(filters) });
		},

		clearQuestFilters: () => set({ questFilters: [] }),
	}))
);
