import { useCallback, useState } from 'react';
import { TaskRead } from '../../../../services/api/schema/task_schema';

export const useBattleTaskProgress = (generatedTasks: TaskRead[]) => {
	const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
	const [completedTasks, setCompletedTasks] = useState<TaskRead[]>([]);

	const handleCompleteTask = useCallback(
		(completedTask: TaskRead) => {
			setCompletedTasks((prev) => [...prev, completedTask]);
			setCurrentTaskIndex((prev) => {
				return prev < generatedTasks.length ? prev + 1 : prev;
			});
		},
		[generatedTasks.length]
	);

	return { completedTasks, currentTaskIndex, handleCompleteTask };
};
