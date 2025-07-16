import { useFloatingScreen } from '../../context/FloatingScreenContext';
import { useGetPlayerSubjects } from './hooks/useGetPlayerSubjects';
import { useAuthInformationStore } from '../Auth/store/authInformationStore';

import SubjectList from './components/SubjectList';
import SubjectHeader from './components/SubjectHeader';
import SubjectScreen from './screens/SubjectScreen/SubjectScreen';
import { useSubjectStore_UI } from './stores/subjectStore_UI';
import AddNewSubjectModal from './modals/AddNewSubjectModal';
import EditSubjectModal from './modals/EditSubjectModal';
import { useCallback, useEffect } from 'react';

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
	const activeModal = useSubjectStore_UI((state) => state.activeModal);
	const activeModalObject = useSubjectStore_UI(
		(state) => state.activeModalObject
	);

	const { data: subjects, isLoading: subjectsIsLoading } =
		useGetPlayerSubjects(currentPlayerId!);

	useEffect(() => {
		console.log('activeModal: ', activeModal, activeModalObject);
	}, [activeModal, activeModalObject]);

	return (
		<div className="h-full w-full flex flex-col">
			{/* Header section with fixed height */}

			{subjectsIsLoading ? (
				<div>Subjects are loading...</div>
			) : (
				<>
					<SubjectHeader playerId={currentPlayerId!} />

					<SubjectList
						handleOpenScreen={handleOpenScreen}
						currentPlayerId={currentPlayerId!}
						subjects={subjects!}
					/>

					{activeModal === 'AddNewSubjectModal' &&
						currentPlayerId && (
							<AddNewSubjectModal playerId={currentPlayerId} />
						)}

					{activeModal === 'EditSubjectModal' &&
						activeModalObject?.objectId != undefined &&
						currentPlayerId &&
						subjects && (
							<EditSubjectModal
								subjectId={
									subjects[activeModalObject.objectId].id
								}
								playerId={currentPlayerId}
								initialSettingConfig={{
									codeName:
										subjects[activeModalObject.objectId]
											.code_name,
									description:
										subjects[activeModalObject.objectId]
											.description,
									difficulty:
										subjects[activeModalObject.objectId]
											.difficulty,
								}}
							/>
						)}
				</>
			)}
		</div>
	);
}
