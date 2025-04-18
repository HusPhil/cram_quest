import { useCallback } from 'react';
import { useFloatingScreen } from '../../context/FloatingScreenContext';
import SubjectScreen from './components/SubjectScreen/SubjectScreen';
import SubjectHeader from './components/SubjectHeader';
import { useGetUserPlayer } from '../CheckIn/hooks/useGetUserPlayer';
import { useAuth } from '../../context/AuthContext';

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

	return (
		<div className="flex flex-col h-full w-full relative">
			{/* Header section - fixed at top */}
			<SubjectHeader playerId={player?.id} />

			{/* Scrollable grid section */}
			<div className="flex-1 overflow-auto flex">
				<div className="w-full max-h-3.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"></div>
			</div>
		</div>
	);
}
