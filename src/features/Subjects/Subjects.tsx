import { useFloatingScreen } from '../../context/FloatingScreenContext';
import { useGetPlayerSubjects } from './hooks/useGetPlayerSubjects';
import { useAuthInformationStore } from '../Auth/store/authInformationStore';

import SubjectList from './components/SubjectList';
import SubjectHeader from './components/SubjectHeader';
import SubjectScreen from './screens/SubjectScreen/SubjectScreen';

export default function Subjects() {
	const { openScreen, setContent } = useFloatingScreen();

	const handleOpenScreen = (
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
	};

	const currentPlayerId = useAuthInformationStore((state) => state.playerId);

	const { data: subjects, isLoading: subjectsIsLoading } =
		useGetPlayerSubjects(currentPlayerId!);

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
				</>
			)}
		</div>
	);
}
