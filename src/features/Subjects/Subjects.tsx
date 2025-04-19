import { lazy, useCallback } from 'react';
import { useFloatingScreen } from '../../context/FloatingScreenContext';
import SubjectHeader from './components/SubjectHeader';
import { useGetUserPlayer } from '../CheckIn/hooks/useGetUserPlayer';
import { useAuth } from '../../context/AuthContext';
import { useGetPlayerSubjects } from '../Quests/components/useGetPlayerSubjects';
import SubjectCard from './components/SubjectCard';
import { SubjectRead } from '../../services/api/schema/subject_schema';

const SubjectScreen = lazy(
	() => import('./components/SubjectScreen/SubjectScreen')
);

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
		<div className="flex flex-col h-full w-full relative">
			{/* Header section - fixed at top */}
			<SubjectHeader playerId={player?.id} />

			{/* Scrollable grid section */}
			<div className="flex-1 overflow-auto flex">
				<div className="w-full max-h-3.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
					{(subjects ?? []).map((subject) => (
						<SubjectCard
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
