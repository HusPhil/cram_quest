import { useCallback, useEffect, useState } from 'react';
import { TaskRead } from '../../../../services/api/schema/task_schema';
import { TaskTimingsStore } from '../task/useTaskTimingsStorage';

export const useBattleTaskProgress = (
	generatedTasks: TaskRead[],
	getAllTimings: () => TaskTimingsStore,
	getNumberOfStoredCompletedTasks: () => number
) => {
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

	useEffect(() => {
		const savedTasks = Object.values(getAllTimings());
		const completedTasks = savedTasks.filter((task) => task.end_time);
		setCompletedTasks(completedTasks as TaskRead[]);
		setCurrentTaskIndex(completedTasks.length);
	}, [getNumberOfStoredCompletedTasks]);

	return { completedTasks, currentTaskIndex, handleCompleteTask };
};
