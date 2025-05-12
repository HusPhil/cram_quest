import { lazy } from 'react';
import { useFloatingScreen } from '../../context/FloatingScreenContext';
import SubjectHeader from './components/SubjectHeader';
import { useGetUserPlayer } from '../CheckIn/hooks/useGetUserPlayer';
import { useAuth } from '../../context/AuthContext';
import { useGetPlayerSubjects } from './hooks/useGetPlayerSubjects';
import SubjectCard from './components/SubjectCard';

const SubjectScreen = lazy(
	() => import('./components/SubjectScreen/SubjectScreen')
);

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

	const { currentUserId } = useAuth();

	const {
		data: player,
		isLoading: playerLoading,
		error: playerError,
	} = useGetUserPlayer(currentUserId!);

	const {
		data: subjects,
		isLoading: subjectsLoading,
		error: subjectsError,
	} = useGetPlayerSubjects(player?.id);

	return (
		<div className="h-full flex flex-col">
			{/* Header section with fixed height */}
			<div className="flex-none">
				<SubjectHeader playerId={player?.id} />
			</div>

			{/* Grid container with controlled height and scroll */}
			<div className="flex-1 overflow-auto my-4">
				<div className="max-h-3.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  pb-4 px-4">
					{(subjects ?? []).map((subject, index) => (
						<SubjectCard
							playerId={player?.id ?? -1}
							subjectId={subject.id}
							key={subject.id}
							code_name={subject.code_name}
							description={subject.description}
							difficulty={subject.difficulty}
							onClick={() =>
								handleOpenScreen(
									subject.id,
									subject.code_name,
									subject.description,
									subject.difficulty
								)
							}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
