import React, { useEffect, useCallback, useMemo, useRef } from 'react';
import BattleArena from './BattleArena';
import { TbFlame, TbSword, TbTargetArrow, TbTrophy } from 'react-icons/tb';
import { killEnemyScene } from '../../../../Battle/battleEngine/scenes/killEnemy/killEnemyScene';
import { QuestRead } from '../../../../../services/api/schema/quest_schema';
import { useBattleSetupStore } from '../../../stores/battleSetupStore';
import { toast } from 'react-toastify';
import { QueueCustomSceneFn } from '../../../../Battle/hooks/useBattleEngine';
import colors from '../../../../../data/colors';
import { TaskRead } from '../../../../../services/api/schema/task_schema';
import { useTaskTimingsStorage } from '../../../hooks/task/useTaskTimingsStorage';
import { useBattleEngineStore } from '../../../stores/battleEngineStore';
import SpriteSheet from '../../../../../components/SpriteSheet';
import { useEndBattleSession } from '../../../hooks/battle/useEndBattleSession';
import { useSyncTaskTimings } from '../../../hooks/task/useSyncTaskTimings';
import { BattleSessionRead } from '../../../../../services/api/schema/battle_session_schema';

interface BattlePageProps {
	battleCleanup: () => void;
	currentQuest: QuestRead;
	battleDuration: number;
}

export interface BattleEngineControllers {
	queueCustomSceneFn: QueueCustomSceneFn;
	getNewEnemyFn: () => void;
}

export default function BattlePage({
	battleCleanup,
	currentQuest,
	battleDuration,
}: BattlePageProps) {
	const queueCustomSceneRef = useRef<QueueCustomSceneFn>(null);
	const getNewEnemyRef = useRef<() => void>(null);

	const endBattleSessionMutate = useEndBattleSession();
	const syncTaskTimingsMutate = useSyncTaskTimings();

	const { saveStartTime, saveEndTime, clearTimings, getAllTimings } =
		useTaskTimingsStorage();

	const getPlayerAnimation = useBattleEngineStore(
		(state) => state.getPlayerAnimation
	);

	const isCustomSceneActive = useBattleEngineStore(
		(state) => state.isCustomSceneActive
	);

	const setPlayerActionRef = useBattleEngineStore(
		(state) => state.setPlayerActionRef
	);

	const generatedTasks = useBattleSetupStore((state) => state.generatedTasks);
	const battleSessionId = useBattleSetupStore(
		(state) => state.battleSessionId
	);

	const battleResult = useBattleSetupStore((state) => state.battleResult);
	const setBattleResult = useBattleSetupStore(
		(state) => state.setBattleResult
	);

	const [completedTasks, setCompletedTasks] = React.useState<TaskRead[]>([]);
	const [currentTaskIndex, setCurrentTaskIndex] = React.useState(0);

	const handleCompleteTask = useCallback(
		(completedTask: TaskRead) => {
			setCompletedTasks((prev) => [...prev, completedTask]);
			setCurrentTaskIndex((prev) => {
				return prev < generatedTasks.length ? prev + 1 : prev;
			});
		},
		[generatedTasks.length]
	);

	const handleKillEnemyAnimationComplete = useCallback(() => {
		const completedTask = generatedTasks[currentTaskIndex];
		handleCompleteTask(completedTask);
	}, [generatedTasks, currentTaskIndex, handleCompleteTask]);

	const handleAnimationLastStepIndex = useCallback(() => {
		const nextTaskIndex = currentTaskIndex + 1;
		if (nextTaskIndex >= generatedTasks.length) return;
		const taskToSave = generatedTasks[nextTaskIndex];
		saveStartTime(taskToSave);

		getNewEnemyRef.current?.();
	}, [currentTaskIndex]);

	const handleQuestComplete = useCallback(() => {
		const taskTimingStore = getAllTimings();

		console.log('taskTimingStore: ', taskTimingStore);

		if (battleResult !== 'defeat') {
			setBattleResult('victory');
		}
		syncTaskTimingsMutate.mutate(
			{
				taskTimingStore,
			},
			{
				onSuccess: () => {
					if (!battleSessionId) return;

					endBattleSessionMutate.mutate(
						{
							battleSessionId,
						},
						{
							onSuccess: (
								battleSessionResult: BattleSessionRead
							) => {
								setPlayerActionRef?.current('idle');
								console.log(
									'battleSessionResult: ',
									battleSessionResult
								);
								clearTimings();
								toast.success('Quest completed!', {
									toastId: 'quest-completed',
								});
							},
						}
					);
				},
				onError: () => {
					toast.error('Failed to sync task timings', {
						toastId: 'sync-task-timings-error',
					});
				},
			}
		);
	}, [battleCleanup]);

	const handleKillEnemy = useCallback(async () => {
		saveEndTime(generatedTasks[currentTaskIndex]);
		queueCustomSceneRef.current?.(
			killEnemyScene,
			'killEnemyScene',
			handleKillEnemyAnimationComplete,
			handleAnimationLastStepIndex
		);
	}, [
		handleKillEnemyAnimationComplete,
		handleAnimationLastStepIndex,
		currentTaskIndex,
	]);

	const initializeBattleEngineControllers = useCallback(
		({ queueCustomSceneFn, getNewEnemyFn }: BattleEngineControllers) => {
			queueCustomSceneRef.current = queueCustomSceneFn;
			getNewEnemyRef.current = getNewEnemyFn;
		},
		[]
	);

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
					<div
						className={`w-full border rounded-md mb-3 p-2 flex gap-2 px-5 items-center justify-between border-success bg-success/15`}
					>
						<TbTrophy
							className="w-6 h-6 shrink-0"
							color={colors.success}
						/>

						<div className="flex flex-col justify-center items-center">
							<p
								className={`line-clamp-2 text-center text-xl text-success`}
							>
								{'VICTORY'}
							</p>
						</div>

						<TbTrophy
							className="w-6 h-6 shrink-0"
							color={colors.success}
						/>
					</div>
					<SpriteSheet
						src={getPlayerAnimation().characterAsset}
						frameHeight={48}
						frameWidth={48}
						frameCount={getPlayerAnimation().frameCount}
						fps={getPlayerAnimation().fps}
						frameRow={getPlayerAnimation().row}
						scale={2.5}
						loop={true}
					/>

					<div
						className={`w-full border rounded-md mb-3 p-2 flex gap-2 px-5 items-center justify-between border-success bg-success/15`}
					>
						<p>{endBattleSessionMutate.isPending.toString()}</p>
					</div>
				</>
			) : (
				<>
					<div
						className={`w-full border rounded-md mb-3 p-2 flex gap-2 px-5 items-center justify-between border-danger bg-danger/15`}
					>
						<TbFlame
							className="w-6 h-6 shrink-0"
							color={colors.danger}
						/>

						<div className="flex flex-col justify-center items-center">
							<p
								className={`line-clamp-2 text-center text-xl text-danger`}
							>
								{'DEFEAT'}
							</p>
						</div>

						<TbFlame
							className="w-6 h-6 shrink-0"
							color={colors.danger}
						/>
					</div>
					<SpriteSheet
						src={getPlayerAnimation().characterAsset}
						frameHeight={48}
						frameWidth={48}
						frameCount={getPlayerAnimation().frameCount}
						fps={getPlayerAnimation().fps}
						frameRow={getPlayerAnimation().row}
						scale={2.5}
						loop={true}
					/>
				</>
			)}
		</div>
	);
}
