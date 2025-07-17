import { useState } from 'react';
import { useGetSubjectQuests } from '../hooks/useGetSubjectQuests';
import StartBattleModal from '../modals/StartBattleModal';

interface SubjectScreenFooterProps {
	subjectId: number;
}

export default function SubjectScreenFooter({
	subjectId,
}: SubjectScreenFooterProps) {
	return (
		<>
			<div className="flex flex-col pb-2 space-y-2">
				<hr className="flex-1 mt-2 border-text/50" />

				<button
					// disabled={subjectQuestsLoading}
					// onClick={handleStartBattleSession}
					className="px-4 py-2 mb-2 bg-accent text-white rounded"
				>
					START BATTLE {subjectId}
				</button>
			</div>
		</>
	);
}
