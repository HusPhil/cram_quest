import { useCallback } from 'react';
import { TaskRead } from '../../../../services/api/schema/task_schema';
import { QueueCustomSceneFn } from '../../../Battle/hooks/useBattleEngine';
import { killEnemyScene } from '../../../Battle/battleEngine/scenes/killEnemy/killEnemyScene';
import { defaultBattleScene } from '../../../Battle/battleEngine/scenes/default/defaultBattleScene';

interface BattleKillEnemyHandlerProps {
	generatedTasks: TaskRead[];
	currentTaskIndex: number;
	queueCustomSceneRef: React.RefObject<QueueCustomSceneFn | null>;
	getNewEnemyRef: React.RefObject<(() => void) | null>;
	saveEndTime: (task: TaskRead) => void;
	saveStartTime: (task: TaskRead) => void;
	handleCompleteTask: (task: TaskRead) => void;
	handleEndBattleSession: () => void;
}

export const useBattleKillEnemyHandler = ({
	handleEndBattleSession,
	generatedTasks,
	currentTaskIndex,
	saveEndTime,
	saveStartTime,
	queueCustomSceneRef,
	getNewEnemyRef,
	handleCompleteTask,
}: BattleKillEnemyHandlerProps) => {
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

	const handleKillEnemy = useCallback(async () => {
		saveEndTime(generatedTasks[currentTaskIndex]);
		queueCustomSceneRef.current?.({
			sceneSteps: killEnemyScene,
			sceneName: 'killEnemyScene',
			onComplete: handleKillEnemyAnimationComplete,
			onLastStepIndex: handleAnimationLastStepIndex,
		});
		if (currentTaskIndex === generatedTasks.length - 1) {
			handleEndBattleSession();
		}
	}, [
		handleKillEnemyAnimationComplete,
		handleAnimationLastStepIndex,
		currentTaskIndex,
	]);

	return handleKillEnemy;
};
