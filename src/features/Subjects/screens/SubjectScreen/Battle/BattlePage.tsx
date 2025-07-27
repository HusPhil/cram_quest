import { useEffect, useMemo } from 'react';
import BattleArena from '../../../components/battle/BattleArena';
import { QuestRead } from '../../../../../services/api/schema/quest_schema';
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
		endBattleSessionMutate,
		getPlayerAnimation,
		handleKillEnemy,
		initializeBattleEngineControllers,
	} = useTaskBattleFlow();

	const battleArenaComponent = useMemo(
		() => (
			<BattleArena
				currentQuest={currentQuest}
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
							battleCleanup={battleCleanup}
							battleSessionResult={endBattleSessionMutate.data}
						/>
					</>
				)
			)}
		</div>
	);
}
