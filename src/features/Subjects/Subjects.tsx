import { useCallback, useState } from 'react';
import { useFloatingScreen } from '../../context/FloatingScreenContext';
import SubjectScreen from './components/SubjectScreen/SubjectScreen';
import Modal from '../../components/Modal';
import AddNewSubjectModal from './components/Modals/AddNewSubjectModal';

export default function Subjects() {
	const { openScreen, setContent } = useFloatingScreen();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenScreen = useCallback(
		(
			subjectId: number,
			subjectCodeName: string,
			subjectDescription: string,
			subjectDifficulty: number
		) => {
			setContent(
				<SubjectScreen
					subjectId={subjectId}
					subjectCodeName={subjectCodeName}
					subjectDescription={subjectDescription}
					subjectDifficulty={subjectDifficulty}
				/>
			);
			openScreen();
		},
		[]
	);

	return (
		<div className="flex flex-col h-full w-full relative">
			{/* Header section - fixed at top */}
			<div className="flex-none px-4 py-2">
				<h1 className="text-2xl font-bold mb-2">Subjects</h1>
				<p className="text-gray-700">
					Explore various subjects and their details.
				</p>
			</div>

			<button onClick={() => setIsModalOpen(true)}>Open Modal</button>

			<AddNewSubjectModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>

			{/* Scrollable grid section */}
			<div className="flex-1 overflow-auto flex">
				<div className="w-full max-h-3.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"></div>
			</div>
		</div>
	);
}
