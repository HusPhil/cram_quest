import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../../lib/axios/axiosInstance';
import { QuestCreate } from '../../../../services/api/schema/quest_schema';
import { getBaseQuestEndRoute } from '../../../../services/api/routes/quest_routes';
import { toast } from '../../../../lib/toastify/charLimitedToast';

export const useCreateQuest = () => {
	return useMutation({
		mutationFn: createQuest,
		onSuccess() {
			toast.success('Quest created successfully');
		},
		onError(error) {
			toast.error('Operation failed: ' + error.message);
		},
	});
};

const createQuest = async ({ questCreate }: { questCreate: QuestCreate }) => {
	const response = await axiosInstance.post(
		getBaseQuestEndRoute(),
		questCreate,
		{ withCredentials: true }
	);

	if (response.status !== 200) {
		throw new Error('Failed to create new subject');
	}

	return response;
};
