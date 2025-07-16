import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { MaterialRead } from '../../../services/api/schema/material_schema';
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

interface SubjectLayoutState {
	activeModal: ModalKey | null;
	activeModalObject: ModalObjectMap[ModalKey] | null;
}

interface SubjectLayoutActions {
	setActiveModal: <T extends ModalKey>(
		modal: T,
		modalObject?: ModalObjectMap[T]
	) => void;

	closeActiveModal: () => void;
}

export const useSubjectStore_UI = create<
	SubjectLayoutState & SubjectLayoutActions
>()(
	subscribeWithSelector((set) => ({
		activeModal: null,
		activeModalObject: null,

		setActiveModal: (modal, modalObject) =>
			set({
				activeModal: modal,
				activeModalObject: (modalObject ?? null) as any,
			}),

		closeActiveModal: () =>
			set({ activeModal: null, activeModalObject: null }),
	}))
);
