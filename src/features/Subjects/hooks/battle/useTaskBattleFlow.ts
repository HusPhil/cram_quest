import { useTaskTimingsStorage } from '../task/useTaskTimingsStorage';
import { useBattleSetupStore } from '../../../Battle/stores/battleSetupStore';
import { useBattleEngineStore } from '../../../Battle/stores/battleEngineStore';
import { useBattleTaskProgress } from './useBattleTaskProgress';
import { useBattleEngineControllers } from './useBattleEngineControllers';
import { useBattleKillEnemyHandler } from './useBattleKillEnemyHandler';
import { useBattleQuestCompletion } from './useBattleQuestCompletion';
import { useEffect } from 'react';

export const useTaskBattleFlow = () => {
	const {
		saveStartTime,
		saveEndTime,
		clearTimings,
		getAllTimings,
		getNumberOfStoredCompletedTasks,
	} = useTaskTimingsStorage();
	const generatedTasks = useBattleSetupStore((state) => state.generatedTasks);
	const battleResult = useBattleSetupStore((state) => state.battleResult);
	const isCustomSceneActive = useBattleEngineStore(
		(state) => state.isCustomSceneActive
	);

	const { completedTasks, currentTaskIndex, handleCompleteTask } =
		useBattleTaskProgress(
			generatedTasks,
			getAllTimings,
			getNumberOfStoredCompletedTasks
		);

	const {
		getNewEnemyRef,
		queueCustomSceneRef,
		initializeBattleEngineControllers,
	} = useBattleEngineControllers();

	const {
		handleSyncTaskTimings,
		getPlayerAnimation,
		battleSessionId,
		endBattleSessionMutate,
		handleEndBattleSession,
	} = useBattleQuestCompletion({
		clearTimings,
		getAllTimings,
		battleResult,
	});

	const handleKillEnemy = useBattleKillEnemyHandler({
		handleEndBattleSession,
		generatedTasks,
		currentTaskIndex,
		saveEndTime,
		saveStartTime,
		queueCustomSceneRef,
		getNewEnemyRef,
		handleCompleteTask,
	});

	useEffect(() => {
		const savedTasks = Object.values(getAllTimings());
		if (generatedTasks.length > 0 && savedTasks.length === 0) {
			const firstTask = generatedTasks[0];
			saveStartTime(firstTask);
		}
	}, [generatedTasks]);

	return {
		generatedTasks,
		isCustomSceneActive,
		battleResult,
		currentTaskIndex,
		completedTasks,
		battleSessionId,
		endBattleSessionMutate,
		getPlayerAnimation,
		saveStartTime,
		handleKillEnemy,
		handleSyncTaskTimings,
		initializeBattleEngineControllers,
	};
};
