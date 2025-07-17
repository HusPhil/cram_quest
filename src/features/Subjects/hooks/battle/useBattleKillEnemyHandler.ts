import { useCallback } from 'react';
import { TaskRead } from '../../../../services/api/schema/task_schema';
import { QueueCustomSceneFn } from '../../../Battle/hooks/useBattleEngine';
import { killEnemyScene } from '../../../Battle/battleEngine/scenes/killEnemy/killEnemyScene';

interface BattleKillEnemyHandlerProps {
	generatedTasks: TaskRead[];
	currentTaskIndex: number;
	saveEndTime: (task: TaskRead) => void;
	saveStartTime: (task: TaskRead) => void;
	queueCustomSceneRef: React.RefObject<QueueCustomSceneFn | null>;
	getNewEnemyRef: React.RefObject<(() => void) | null>;
	handleCompleteTask: (task: TaskRead) => void;
}

export const useBattleKillEnemyHandler = ({
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

	return handleKillEnemy;
};
