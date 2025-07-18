import { useEffect, useMemo } from 'react';
import BattleArena from '../../../components/battle/BattleArena';
import { TbSword, TbTargetArrow, TbTrophy } from 'react-icons/tb';
import { QuestRead } from '../../../../../services/api/schema/quest_schema';
import colors from '../../../../../data/colors';
import { useTaskBattleFlow } from '../../../hooks/battle/useTaskBattleFlow';
import BattleResultDisplay from '../../../components/battle/BattleResultDisplay';
import BattleCombatPanel from '../../../components/battle/BattleCombatPanel';
import { toast } from 'react-toastify';

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
		battleSessionId,
		endBattleSessionMutate,
		getPlayerAnimation,
		handleKillEnemy,
		handleSyncTaskTimings,
		initializeBattleEngineControllers,
	} = useTaskBattleFlow();

	useEffect(() => {
		// const getBattleSessionResult = async () => {
		// 	if (currentTaskIndex >= generatedTasks.length) {
		// 		const battleSessionResult = await handleSyncTaskTimings();
		// 		console.log('battleSessionResult', battleSessionResult);
		// 	}
		// };
		// getBattleSessionResult();

		const handleQuestComplete = async () => {
			if (
				currentTaskIndex >= generatedTasks.length &&
				battleSessionId != null
			) {
				await handleSyncTaskTimings();
				endBattleSessionMutate.mutate(
					{ battleSessionId },
					{
						onSuccess: () => {
							toast.success('Battle session ended successfully', {
								toastId: 'end-battle-session',
							});
						},
					}
				);
			}
		};

		handleQuestComplete();
	}, [currentTaskIndex, generatedTasks, handleSyncTaskTimings]);

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

	return (
		<div className="flex items-center flex-col">
			{!isAllTasksCompleted ? (
				<BattleCombatPanel
					currentQuest={currentQuest}
					currentTask={currentTask}
					battleArenaComponent={battleArenaComponent}
					completedTasksCount={completedTasksCount}
					totalTasksCount={totalTasksCount}
					isAllTasksCompleted={isAllTasksCompleted}
					isCustomSceneActive={isCustomSceneActive}
					handleKillEnemy={handleKillEnemy}
				/>
			) : (
				battleResult && (
					<>
						<BattleResultDisplay
							sprite={getPlayerAnimation()}
							result={battleResult}
						/>
						<button
							onClick={battleCleanup}
							className="mt-3 flex items-center gap-2 text-accent"
						>
							<TbTrophy
								className="w-6 h-6"
								color={colors.accent}
							/>
							Continue
						</button>
					</>
				)
			)}
		</div>
	);
}
