import { useTaskTimingsStorage } from '../task/useTaskTimingsStorage';
import { useBattleSetupStore } from '../../stores/battleSetupStore';
import { useBattleEngineStore } from '../../stores/battleEngineStore';
import { useBattleTaskProgress } from './useBattleTaskProgress';
import { useBattleEngineControllers } from './useBattleEngineControllers';
import { useBattleKillEnemyHandler } from './useBattleKillEnemyHandler';
import { useBattleQuestCompletion } from './useBattleQuestCompletion';
import { useEffect } from 'react';

export const useTaskBattleFlow = (battleCleanup: () => void) => {
	const { saveStartTime, saveEndTime, clearTimings, getAllTimings } =
		useTaskTimingsStorage();
	const generatedTasks = useBattleSetupStore((state) => state.generatedTasks);
	const battleResult = useBattleSetupStore((state) => state.battleResult);
	const isCustomSceneActive = useBattleEngineStore(
		(state) => state.isCustomSceneActive
	);

	const { completedTasks, currentTaskIndex, handleCompleteTask } =
		useBattleTaskProgress(generatedTasks);

	const {
		getNewEnemyRef,
		queueCustomSceneRef,
		initializeBattleEngineControllers,
	} = useBattleEngineControllers();

	const handleKillEnemy = useBattleKillEnemyHandler({
		generatedTasks,
		currentTaskIndex,
		saveEndTime,
		saveStartTime,
		queueCustomSceneRef,
		getNewEnemyRef,
		handleCompleteTask,
	});

	const handleQuestComplete = useBattleQuestCompletion({
		clearTimings,
		getAllTimings,
		battleResult,
	});

	useEffect(() => {
		if (generatedTasks.length > 0) {
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
		saveStartTime,
		handleKillEnemy,
		handleQuestComplete,
		initializeBattleEngineControllers,
	};
};
