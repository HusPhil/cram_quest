import { useState } from 'react';
import { useGetSubjectQuests } from '../hooks/quest/useGetSubjectQuests';
import StartBattleModal from '../modals/StartBattleModal';
import { useSubjectStore_UI } from '../stores/subjectStore_UI';

interface SubjectScreenFooterProps {
	subjectId: number;
}

export default function SubjectScreenFooter({}: SubjectScreenFooterProps) {
	const setActiveModal = useSubjectStore_UI((state) => state.setActiveModal);
	const subjectQuests = useSubjectStore_UI((state) => state.subjectQuests);

	return (
		<>
			<div className="flex flex-col pb-2 space-y-2">
				<hr className="flex-1 mt-2 border-text/50" />

				<button
					onClick={() => setActiveModal('StartBattleModal')}
					disabled={subjectQuests == null}
					className="px-4 py-2 mb-2 bg-accent text-background rounded disabled:opacity-50 disabled:cursor-not-allowed"
				>
					START BATTLE
				</button>
			</div>
		</>
	);
}
