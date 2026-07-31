import { useCallback, useEffect, useRef } from 'react';
import { useStartTask } from './useStartTask';
import { useEndTask } from './useEndTask';
import { useTaskTimingsStorage } from './useTaskTimingsStorage';

export const useTaskTimingSync = () => {
	const { getOutbox, removeFromOutbox } = useTaskTimingsStorage();
	const startTaskMutate = useStartTask();
	const endTaskMutate = useEndTask();

	// Keep the latest sync logic in a ref so the mount/online effect stays
	// stable and never re-fires in a loop when mutation state changes.
	const syncTaskRef = useRef<(taskId: number) => Promise<void>>(() =>
		Promise.resolve()
	);

	useEffect(() => {
		syncTaskRef.current = async (taskId: number) => {
			const timing = getOutbox()[taskId];
			if (!timing) return;

			try {
				if (timing.start_time) {
					await startTaskMutate.mutateAsync({ taskId });
				}
				if (timing.end_time) {
					await endTaskMutate.mutateAsync({ taskId });
				}
				removeFromOutbox(taskId);
			} catch {
				// Keep the task queued in the outbox and retry later
			}
		};
	}, [getOutbox, removeFromOutbox, startTaskMutate, endTaskMutate]);

	const syncPendingTask = useCallback((taskId: number) => {
		syncTaskRef.current(taskId);
	}, []);

	const isFlushingRef = useRef(false);

	const flushPendingTimings = useCallback(async () => {
		if (isFlushingRef.current) return;
		isFlushingRef.current = true;
		try {
			const pendingIds = Object.keys(getOutbox()).map(Number);
			for (const taskId of pendingIds) {
				await syncTaskRef.current(taskId);
			}
		} finally {
			isFlushingRef.current = false;
		}
	}, [getOutbox]);

	const flushRef = useRef(flushPendingTimings);
	useEffect(() => {
		flushRef.current = flushPendingTimings;
	}, [flushPendingTimings]);

	useEffect(() => {
		const handleOnline = () => {
			flushRef.current();
		};

		flushRef.current();
		window.addEventListener('online', handleOnline);

		return () => window.removeEventListener('online', handleOnline);
	}, []);

	return { syncPendingTask, flushPendingTimings };
};
