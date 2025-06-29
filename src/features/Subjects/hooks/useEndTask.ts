import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../lib/axios/axiosInstance';
import { getEndTaskEndRoute } from '../../../services/api/routes/task_routes';

export const useEndTask = () => {
	return useMutation({
		mutationFn: endTask,
	});
};

const endTask = async ({ taskId }: { taskId: number }) => {
	const response = await axiosInstance.post(
		getEndTaskEndRoute(taskId),
		{},
		{
			withCredentials: true,
		}
	);

	if (response.status !== 200) {
		throw new Error('Failed to create new subject');
	}

	return response;
};
