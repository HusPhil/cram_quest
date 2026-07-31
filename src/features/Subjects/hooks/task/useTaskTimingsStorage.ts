import { useCallback } from 'react';
import { TaskRead } from '../../../../services/api/schema/task_schema';

interface TaskTiming {
	start_time: string | null; // ISO string
	end_time: string | null;
	description: string;
}

export type TaskTimingsStore = Record<number, TaskTiming>;

interface TaskTimingOutboxEntry {
	start_time?: string; // ISO string
	end_time?: string; // ISO string
}

export type TaskTimingsOutbox = Record<number, TaskTimingOutboxEntry>;

const STORAGE_KEY = 'task_timings';
const OUTBOX_KEY = 'task_timings_outbox';

export const useTaskTimingsStorage = () => {
	const getStoredTimings = useCallback((): TaskTimingsStore => {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : {};
	}, []);

	const getOutbox = useCallback((): TaskTimingsOutbox => {
		const raw = localStorage.getItem(OUTBOX_KEY);
		return raw ? JSON.parse(raw) : {};
	}, []);

	const addToOutbox = useCallback(
		(taskId: number, patch: TaskTimingOutboxEntry) => {
			const current = getOutbox();
			current[taskId] = {
				...current[taskId],
				...patch,
			};
			localStorage.setItem(OUTBOX_KEY, JSON.stringify(current));
		},
		[getOutbox]
	);

	const removeFromOutbox = useCallback(
		(taskId: number) => {
			const current = getOutbox();
			if (!current[taskId]) return;
			delete current[taskId];
			localStorage.setItem(OUTBOX_KEY, JSON.stringify(current));
		},
		[getOutbox]
	);

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
			addToOutbox(taskId, { start_time: current[taskId].start_time! });
		},
		[getStoredTimings, addToOutbox]
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
			addToOutbox(taskId, { end_time: current[taskId].end_time! });
		},
		[getStoredTimings, addToOutbox]
	);

	const getAllTimings = useCallback((): TaskTimingsStore => {
		return getStoredTimings();
	}, [getStoredTimings]);

	const clearTimings = useCallback(() => {
		localStorage.removeItem(STORAGE_KEY);
		localStorage.removeItem(OUTBOX_KEY);
	}, []);

	return {
		saveStartTime,
		saveEndTime,
		getAllTimings,
		getOutbox,
		removeFromOutbox,
		clearTimings,
	};
};
