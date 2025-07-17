import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../../lib/axios/axiosInstance';
import { getStartTaskEndRoute } from '../../../../services/api/routes/task_routes';
import { BattleSessionRead } from '../../../../services/api/schema/battle_session_schema';

export const useStartTask = () => {
	return useMutation({
		mutationFn: startTask,
	});
};

const startTask = async ({
	taskId,
}: {
	taskId: number;
}): Promise<BattleSessionRead> => {
	const response = await axiosInstance.post(
		getStartTaskEndRoute(taskId),
		{},
		{
			withCredentials: true,
		}
	);

	if (response.status !== 200) {
		throw new Error('Failed to create new subject');
	}

	return response.data;
};
