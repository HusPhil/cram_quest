import { memo } from 'react';
import { SubjectRead } from '../../../services/api/schema/subject_schema';
import SubjectCard from './SubjectCard';
import EmptyListNote from '../../../components/EmptyListNote';
import { useGetResumableBattleSession } from '../hooks/battle/useGetResumableBattleSession';
import { BattleSessionRead } from '../../../services/api/schema/battle_session_schema';
import { useSubjectStore_UI } from '../stores/subjectStore_UI';
import { useBattleSetupStore } from '../../Battle/stores/battleSetupStore';
import { QuestRead } from '../../../services/api/schema/quest_schema';

interface SubjectListProps {
	subjects: SubjectRead[];
	currentPlayerId: number;
	handleOpenScreen: (
		subjectId: number,
		subjectCodeName: string,
		subjectDescription: string,
		subjectDifficulty: number
	) => void;
}
const SubjectList = ({
	subjects,
	currentPlayerId,
	handleOpenScreen,
}: SubjectListProps) => {
	const setActiveModal = useSubjectStore_UI((state) => state.setActiveModal);
	const setBattleActive = useBattleSetupStore(
		(state) => state.setIsBattleActive
	);
	const isBattleActive = useBattleSetupStore((state) => state.isBattleActive);
	const setSelectedQuest = useBattleSetupStore((state) => state.selectQuest);
	const setGeneratedTasks = useBattleSetupStore(
		(state) => state.setGeneratedTasks
	);
	const setBattleSessionId = useBattleSetupStore(
		(state) => state.setBattleSessionId
	);
	const setBattleDuration = useBattleSetupStore((state) => state.setDuration);

	const battleResumeRequestTime = new Date();

	const handleOpenResumeScreen = (
		currentTime?: string,
		sessionData?: BattleSessionRead,
		questData?: QuestRead
	) => {
		if (!sessionData || !questData || !currentTime) return;

		const subjectWithResumableQuest = subjects.find(
			(subject) => subject.id === sessionData.subject_id
		);
		if (!subjectWithResumableQuest) return;

		setBattleActive(true);
		setSelectedQuest(questData);
		setGeneratedTasks(sessionData.tasks!);
		setBattleSessionId(sessionData.id);

		const nowDateTime = new Date();

		const ellapsedTime =
			battleResumeRequestTime.getTime() - nowDateTime.getTime();

		const serverStartTime = new Date(currentTime!);
		const startDateTimeWithOffset =
			serverStartTime.getTime() - ellapsedTime;

		const endDateTime = new Date(sessionData.end_time!);
		const timeDiffMilisecs =
			endDateTime.getTime() - startDateTimeWithOffset;

		const durationMins = timeDiffMilisecs / (1000 * 60);

		setBattleDuration(Math.max(durationMins, 0));

		handleOpenScreen(
			subjectWithResumableQuest.id,
			subjectWithResumableQuest.code_name,
			subjectWithResumableQuest.description,
			subjectWithResumableQuest.difficulty
		);
		setActiveModal('StartBattleModal');
	};

	useGetResumableBattleSession(handleOpenResumeScreen, isBattleActive);

	return (
		<div className="flex-1 my-4 relative">
			{subjects.length <= 0 ? (
				<div className="h-full w-full flex items-center justify-center">
					<EmptyListNote
						message="Begin your journey,"
						hint="add a new subject now!"
						className="text-xl"
					/>
				</div>
			) : (
				<div
					className="absolute inset-0 overflow-y-auto overscroll-behavior-y-contain
                  scroll-smooth -webkit-overflow-scrolling-touch "
				>
					<div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4
                    "
					>
						{(
							subjects.sort(
								(a, b) => b.difficulty - a.difficulty
							) ?? []
						).map((subject, index) => (
							<SubjectCard
								key={subject.id}
								index={index}
								playerId={currentPlayerId!}
								subjectId={subject.id}
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
			)}
		</div>
	);
};

export default memo(SubjectList);
