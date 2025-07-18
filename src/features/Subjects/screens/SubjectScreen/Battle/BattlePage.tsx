import { useEffect, useMemo } from 'react';
import BattleArena from '../../../components/battle/BattleArena';
import { TbSword, TbTargetArrow, TbTrophy } from 'react-icons/tb';
import { QuestRead } from '../../../../../services/api/schema/quest_schema';
import colors from '../../../../../data/colors';
import { useTaskBattleFlow } from '../../../hooks/battle/useTaskBattleFlow';
import BattleResultDisplay from '../../../components/battle/BattleResultDisplay';
import BattleCombatPanel from '../../../components/battle/BattleCombatPanel';

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
		getPlayerAnimation,
		handleKillEnemy,
		handleQuestComplete,
		initializeBattleEngineControllers,
	} = useTaskBattleFlow(battleCleanup);

	useEffect(() => {
		if (currentTaskIndex >= generatedTasks.length) {
			handleQuestComplete();
		}
	}, [currentTaskIndex, generatedTasks, handleQuestComplete]);

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
