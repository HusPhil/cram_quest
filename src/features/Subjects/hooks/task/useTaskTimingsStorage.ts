import { useCallback } from 'react';
import { TaskRead } from '../../../../services/api/schema/task_schema';

interface TaskTiming {
	start_time: string | null; // ISO string
	end_time: string | null;
	description: string;
}

export type TaskTimingsStore = Record<number, TaskTiming>;

const STORAGE_KEY = 'task_timings';

export const useTaskTimingsStorage = () => {
	const getStoredTimings = useCallback((): TaskTimingsStore => {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : {};
	}, []);

	const saveStartTime = useCallback(
		(task: TaskRead) => {
			const current = getStoredTimings();
			const taskId = task.id;
			current[taskId] = {
				start_time: new Date().toISOString(),
				end_time: null,
				description: task.description,
			};
			localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
		},
		[getStoredTimings]
	);

	const saveEndTime = useCallback(
		(task: TaskRead) => {
			const current = getStoredTimings();
			const taskId = task.id;
			if (current[taskId]) {
				current[taskId].end_time = new Date().toISOString();
				localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
			} else {
				current[taskId] = {
					start_time: null,
					end_time: new Date().toISOString(),
					description: task.description,
				};
				localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
			}
		},
		[getStoredTimings]
	);

	const getAllTimings = useCallback((): TaskTimingsStore => {
		return getStoredTimings();
	}, [getStoredTimings]);

	const clearTimings = useCallback(() => {
		localStorage.removeItem(STORAGE_KEY);
	}, []);

	return {
		saveStartTime,
		saveEndTime,
		getAllTimings,
		clearTimings,
	};
};
