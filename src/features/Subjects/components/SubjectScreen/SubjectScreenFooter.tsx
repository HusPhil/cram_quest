import { useState } from 'react';
import { useFloatingScreen } from '../../../../context/FloatingScreenContext';
import AddNewSubjectModal from '../Modals/AddNewSubjectModal';

interface SubjectScreenFooterProps {
	subjectId: Number;
}

export default function SubjectScreenFooter({
	subjectId,
}: SubjectScreenFooterProps) {
	const { closeScreen } = useFloatingScreen();
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
					onClick={handleStartBattleSession}
					className="px-4 py-2 mb-2 bg-accent text-white rounded"
				>
					Start Battle for subject: {subjectId.toString()}
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
