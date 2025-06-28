import React, { useEffect, useCallback, useMemo, useRef } from 'react';
import { useBattleSetup } from '../../../Battle/hooks/useBattleSetup';
import BattleArena from './BattleArena';
import { TbSword, TbTargetArrow } from 'react-icons/tb';
import { killEnemyScene } from '../../../Battle/battleEngine/scenes/killEnemy/killEnemyScene';
import { QuestRead } from '../../../../services/api/schema/quest_schema';
import { useSetupBattleStore } from '../../stores/setupBattleStore';
import { toast } from 'react-toastify';
import { useBattleEngineStore } from '../../stores/battleEngineStore';
import { QueueCustomSceneFn } from '../../../Battle/hooks/useBattleEngine';
import colors from '../../../../data/colors';

interface BattleScreenProps {
	battleCleanup: () => void;
	currentQuest: QuestRead;
	battleDuration: number;
}

export interface BattleEngineControllers {
	queueCustomSceneFn: QueueCustomSceneFn;
	getNewEnemyFn: () => void;
}

export default function BattleScreen({
	battleCleanup,
	currentQuest,
	battleDuration,
}: BattleScreenProps) {
	// const { battleEngineProps, battleUIProviderProps } = useBattleSetup();

	// const getNewEnemy = useBattleEngineStore((state) => state.getNewEnemy);
	const queueCustomSceneRef = useRef<QueueCustomSceneFn>(null);
	const getNewEnemyRef = useRef<() => void>(null);

	// Memoize the selector to prevent unnecessary re-renders
	const getSelectedTasks = useSetupBattleStore(
		useCallback((state) => state.getCleanedQuestSteps, [])
	);

	// Memoize the selected tasks array to prevent recalculation
	const selectedTasks = useMemo(() => getSelectedTasks(), [getSelectedTasks]);

	const [completedTasks, setCompletedTasks] = React.useState<string[]>([]);
	const [currentTaskIndex, setCurrentTaskIndex] = React.useState(0);

	// Memoize handlers to prevent child re-renders
	const handleCompleteTask = useCallback(
		(completedTask: string) => {
			setCompletedTasks((prev) => [...prev, completedTask]);
			setCurrentTaskIndex((prev) => {
				return prev < selectedTasks.length ? prev + 1 : prev;
			});
		},
		[selectedTasks.length]
	);

	const handleKillEnemyAnimationComplete = useCallback(() => {
		const completedTask = selectedTasks[currentTaskIndex];
		handleCompleteTask(completedTask);
	}, [selectedTasks, currentTaskIndex, handleCompleteTask]);

	const handleAnimationLastStepIndex = useCallback(() => {
		getNewEnemyRef.current?.();
	}, []);

	const handleQuestComplete = useCallback(() => {
		toast.success('Quest completed!', {
			toastId: 'quest-completed',
		});
		setTimeout(() => {
			battleCleanup();
		}, 1000 * 3);
	}, [battleCleanup]);

	// Memoize the quest completion check
	const isQuestComplete = useMemo(() => {
		return currentTaskIndex >= selectedTasks.length;
	}, [currentTaskIndex, selectedTasks.length]);

	useEffect(() => {
		if (isQuestComplete) {
			handleQuestComplete();
		}
	}, [isQuestComplete, handleQuestComplete]);

	const handleKillEnemy = useCallback(() => {
		queueCustomSceneRef.current?.(
			killEnemyScene,
			'killEnemyScene',
			handleKillEnemyAnimationComplete,
			handleAnimationLastStepIndex
		);
	}, [handleKillEnemyAnimationComplete, handleAnimationLastStepIndex]);

	const initializeBattleEngineControllers = useCallback(
		({ queueCustomSceneFn, getNewEnemyFn }: BattleEngineControllers) => {
			queueCustomSceneRef.current = queueCustomSceneFn;
			getNewEnemyRef.current = getNewEnemyFn;
		},
		[]
	);

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
	const totalTasksCount = selectedTasks.length;
	const isAllTasksCompleted = completedTasksCount === totalTasksCount;
	const currentTask = selectedTasks[currentTaskIndex];

	// Memoize the progress display
	const progressDisplay = useMemo(
		() => (
			<p>
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
			<div className="flex flex-col items-center w-full my-3">
				<p className="text-xs">{'< Current Task >'}</p>
				<p className="line-clamp-2 text-white text-center">
					{currentTask}
				</p>
			</div>
		);
	}, [isAllTasksCompleted, currentTask]);

	return (
		<div className="flex items-center flex-col">
			<div className="w-full border border-accent p-2 bg-accent/15 rounded-md mb-3 flex gap-2 px-5 items-center justify-between">
				<TbTargetArrow className="w-6 h-6 shrink-0" color="#fbbf24" />

				<div className="flex flex-col justify-center items-center">
					{/* <div>
						{Array.from(
							{ length: currentQuest.difficulty },
							(_, index) => (
								<small key={index} className="text-xs">
									⭐
								</small>
							)
						)}
					</div> */}
					<p className="line-clamp-2 text-accent text-center">
						{currentQuest.description}
					</p>
				</div>

				<TbTargetArrow className="w-6 h-6 shrink-0" color="#fbbf24" />
			</div>
			<div className="shrink-0 mt-2">
				{/* <BattleArena {...arenaProps} duration={battleDuration} /> */}
				{battleArenaComponent}
			</div>
			{progressDisplay}
			{currentTaskDisplay}
			<button
				disabled={isAllTasksCompleted}
				onClick={handleKillEnemy}
				className={`p-3 mt-3 bg-accent text-background flex justify-center items-center rounded-md ${
					isAllTasksCompleted
						? 'opacity-50 cursor-not-allowed'
						: 'hover:bg-accent/90'
				}`}
			>
				<TbSword className="w-5 h-5 mr-2" color={colors.secondary} />
				Task Slayed!
			</button>
		</div>
	);
}
