import { useCallback, useEffect, useState } from 'react';
import { TaskRead } from '../../../../services/api/schema/task_schema';
import { TaskTimingsStore } from '../task/useTaskTimingsStorage';

export const useBattleTaskProgress = (
	generatedTasks: TaskRead[],
	getAllTimings: () => TaskTimingsStore
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
		const timings = getAllTimings();
		const completedTasks = generatedTasks.filter(
			(task) => timings[task.id]?.end_time
		);
		setCompletedTasks(completedTasks);
		setCurrentTaskIndex(completedTasks.length);
	}, [generatedTasks, getAllTimings]);

	return { completedTasks, currentTaskIndex, handleCompleteTask };
};
