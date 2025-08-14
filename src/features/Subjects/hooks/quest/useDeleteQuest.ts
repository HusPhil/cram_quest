import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../../lib/axios/axiosInstance';
import { getBaseQuestWithIdEndRoute } from '../../../../services/api/routes/quest_routes';
import { toast } from '../../../../lib/toastify/charLimitedToast';

export const useDeleteQuest = () => {
	return useMutation({
		mutationFn: deleteQuest,
		onError(error) {
			toast.error('Operation failed: ' + error.message, {
				toastId: 'quest-delete-error',
			});
		},
	});
};

const deleteQuest = async ({ questId }: { questId: number }) => {
	const response = await axiosInstance.delete(
		getBaseQuestWithIdEndRoute(questId),
		{ withCredentials: true }
	);

	if (response.status !== 200) {
		throw new Error('Failed to delete new subject');
	}

	return response;
};
