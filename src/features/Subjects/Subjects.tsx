import { useFloatingScreen } from '../../context/FloatingScreenContext';
import { useGetPlayerSubjects } from './hooks/subject/useGetPlayerSubjects';
import { useAuthInformationStore } from '../Auth/stores/authInformationStore';

import SubjectList from './components/SubjectList';
import SubjectHeader from './components/SubjectHeader';
import SubjectScreen from './screens/SubjectScreen/SubjectScreen';
import { ModalObjectMap, useSubjectStore_UI } from './stores/subjectStore_UI';
import AddNewSubjectModal from './modals/AddNewSubjectModal';
import EditSubjectModal from './modals/EditSubjectModal';
import { useCallback } from 'react';
import SubjectListSkeleton from '../../components/Skeletons/SubjectListSkeleton';

export default function Subjects() {
	const { openScreen, setContent } = useFloatingScreen();

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

	const currentPlayerId = useAuthInformationStore((state) => state.playerId);
	const activeModalObject = useSubjectStore_UI(
		(state) => state.activeModalObject
	);

	const { data: subjects, isLoading: subjectsIsLoading } =
		useGetPlayerSubjects(currentPlayerId!);

	// const subjects = [];
	// const subjectsIsLoading = true;

	return (
		<div className="h-full w-full max-w-[1200px] flex flex-col py-3 px-3.5 md:py-5 md:px-7">
			{/* Header section with fixed height */}

			{subjectsIsLoading ? (
				<SubjectListSkeleton />
			) : (
				<>
					<SubjectHeader playerId={currentPlayerId!} />

					<SubjectList
						handleOpenScreen={handleOpenScreen}
						currentPlayerId={currentPlayerId!}
						subjects={subjects!}
					/>

					<AddNewSubjectModal
						playerId={currentPlayerId || undefined}
					/>

					<EditSubjectModal
						subject={
							activeModalObject as ModalObjectMap['EditSubjectModal']
						}
					/>
				</>
			)}
		</div>
	);
}
