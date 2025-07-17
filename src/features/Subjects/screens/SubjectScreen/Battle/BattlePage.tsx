import { useEffect, useMemo } from 'react';
import BattleArena from './BattleArena';
import { TbSword, TbTargetArrow } from 'react-icons/tb';
import { QuestRead } from '../../../../../services/api/schema/quest_schema';
import colors from '../../../../../data/colors';
import { useTaskBattleFlow } from '../../../hooks/battle/useTaskBattleFlow';

interface BattlePageProps {
	battleCleanup: () => void;
	currentQuest: QuestRead;
	battleDuration: number;
}

export default function BattlePage({
	battleCleanup,
	currentQuest,
	battleDuration,
}: BattlePageProps) {
	const {
		generatedTasks,
		battleResult,
		completedTasks,
		currentTaskIndex,
		isCustomSceneActive,
		saveStartTime,
		handleKillEnemy,
		handleQuestComplete,
		initializeBattleEngineControllers,
	} = useTaskBattleFlow(battleCleanup);

	const isQuestComplete = useMemo(() => {
		return currentTaskIndex >= generatedTasks.length;
	}, [currentTaskIndex, generatedTasks.length]);

	useEffect(() => {
		if (isQuestComplete) {
			handleQuestComplete();
		}
	}, [isQuestComplete, handleQuestComplete]);

	const battleArenaComponent = useMemo(
		() => (
			<BattleArena
				duration={battleDuration}
				initializeBattleEngineControllers={
					initializeBattleEngineControllers
				}
			/>
		),
		[battleDuration]
	);

	// Memoize derived values
	const completedTasksCount = completedTasks.length;
	const totalTasksCount = generatedTasks.length;
	const isAllTasksCompleted = completedTasksCount === totalTasksCount;
	const currentTask = generatedTasks[currentTaskIndex];

	// Memoize the progress display
	const progressDisplay = useMemo(
		() => (
			<p className="mt-3 opacity-50 text-white">
				{completedTasksCount}/{totalTasksCount}
			</p>
		),
		[completedTasksCount, totalTasksCount]
	);

	// Memoize the current task display
	const currentTaskDisplay = useMemo(() => {
		if (isAllTasksCompleted) {
			return <>COMPLETED!</>;
		}

		return (
			<div className="flex flex-col items-center w-full">
				<p className="line-clamp-2 text-white text-center">
					{currentTask.description}
				</p>
			</div>
		);
	}, [isAllTasksCompleted, currentTask]);

	useEffect(() => {
		if (generatedTasks.length > 0) {
			const firstTask = generatedTasks[0];
			saveStartTime(firstTask);
		}
	}, [generatedTasks]);

	return (
		<div className="flex items-center flex-col">
			{!isAllTasksCompleted ? (
				<>
					<div
						className={`w-full border rounded-md mb-3 p-2 flex gap-2 px-5 items-center justify-between border-accent bg-accent/15`}
					>
						<TbTargetArrow
							className="w-6 h-6 shrink-0"
							color={colors.accent}
						/>

						<div className="flex flex-col justify-center items-center">
							<p
								className={`line-clamp-2 text-center text-accent`}
							>
								{currentQuest.description}
							</p>
						</div>

						<TbTargetArrow
							className="w-6 h-6 shrink-0"
							color={colors.accent}
						/>
					</div>
					<div className="shrink-0 mt-2"> {battleArenaComponent}</div>
					{progressDisplay}
					{currentTaskDisplay}
					<button
						disabled={isAllTasksCompleted || isCustomSceneActive}
						onClick={handleKillEnemy}
						className={`p-3 mt-3 bg-accent text-background flex justify-center items-center rounded-md disabled:cursor-not-allowed disabled:opacity-35 ${
							isAllTasksCompleted
								? 'opacity-50 cursor-not-allowed'
								: 'hover:bg-accent/90'
						}`}
					>
						<TbSword
							className="w-5 h-5 mr-2"
							color={colors.secondary}
						/>
						Task Slayed!
					</button>
				</>
			) : battleResult === 'victory' ? (
				<>
					<p>You won</p>
					<button onClick={battleCleanup}>end</button>
				</>
			) : (
				<>
					<p>You lost</p>
					<button onClick={battleCleanup}>end</button>
				</>
			)}
		</div>
	);
}
