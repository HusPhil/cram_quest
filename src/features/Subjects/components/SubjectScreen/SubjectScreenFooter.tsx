import { useState } from 'react';
import { useFloatingScreen } from '../../../../context/FloatingScreenContext';
import AddNewSubjectModal from '../Modals/AddNewSubjectModal';
import { useGetSubjectQuests } from '../../hooks/useGetSubjectQuests';

interface SubjectScreenFooterProps {
	subjectId: number;
}

export default function SubjectScreenFooter({
	subjectId,
}: SubjectScreenFooterProps) {
	const {
		data: subjectQuests,
		isLoading: subjectQuestsLoading,
		isError: subjectQuestsError,
	} = useGetSubjectQuests(subjectId);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleStartBattleSession = () => {
		// closeScreen();
		setIsModalOpen(true);
	};

	return (
		<>
			<div className="flex flex-col pb-2 space-y-2">
				<hr className="flex-1 mt-2 border-text/50" />

				<button
					disabled={subjectQuestsLoading}
					onClick={handleStartBattleSession}
					className="px-4 py-2 mb-2 bg-accent text-white rounded"
				>
					START BATTLE
				</button>
			</div>
			<AddNewSubjectModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				playerId={23}
			/>
		</>
	);
}
