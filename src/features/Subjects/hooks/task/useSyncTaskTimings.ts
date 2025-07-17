import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../../lib/axios/axiosInstance';
import { syncTaskTimingsEndRoute } from '../../../../services/api/routes/task_routes';
import { TaskTimingsStore } from './useTaskTimingsStorage';

export const useSyncTaskTimings = () => {
	return useMutation({
		mutationFn: syncTaskTimings,
	});
};

const syncTaskTimings = async ({
	taskTimingStore,
}: {
	taskTimingStore: TaskTimingsStore;
}) => {
	const response = await axiosInstance.post(
		syncTaskTimingsEndRoute,
		taskTimingStore,
		{ withCredentials: true }
	);

	if (response.status !== 200) {
		throw new Error('Failed to sync task timings');
	}

	return response.data;
};
