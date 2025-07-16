import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

type ModalObjectMap = {
	AddNewSubjectModal: never; // doesn’t need an object
	EditSubjectModal: { objectId: number };
	AddNewMaterialModal: never;
	EditMaterialModal: { objectId: number };
	AddNewQuestModal: never;
	StartBattleModal: { objectId: number };
};

type SubjectModals =
	| 'AddNewSubjectModal'
	| 'EditSubjectModal'
	| 'AddNewMaterialModal'
	| 'EditMaterialModal'
	| 'AddNewQuestModal'
	| 'StartBattleModal';

interface SubjectLayoutState {
	activeModal: SubjectModals | null;
	activeModalObject: ModalObjectMap[SubjectModals] | null;
}

interface SubjectLayoutActions {
	setActiveModal: <T extends SubjectModals>(
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
