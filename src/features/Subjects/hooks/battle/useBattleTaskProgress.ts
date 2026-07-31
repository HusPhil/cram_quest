import { useCallback, useEffect, useState } from 'react';
import { TaskRead } from '../../../../services/api/schema/task_schema';
import {
	TaskTimingsOutbox,
	TaskTimingsStore,
} from '../task/useTaskTimingsStorage';

export const useBattleTaskProgress = (
	generatedTasks: TaskRead[],
	getAllTimings: () => TaskTimingsStore,
	getOutbox: () => TaskTimingsOutbox
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
		const outbox = getOutbox();
		const completedTasks = generatedTasks.filter((task) => {
			const serverEnded = !!task.end_time;
			const localEnded = !!timings[task.id]?.end_time;
			const queuedEnded = !!outbox[task.id]?.end_time;
			return serverEnded || localEnded || queuedEnded;
		});
		setCompletedTasks(completedTasks);
		setCurrentTaskIndex(completedTasks.length);
	}, [generatedTasks, getAllTimings, getOutbox]);

	return { completedTasks, currentTaskIndex, handleCompleteTask };
};
