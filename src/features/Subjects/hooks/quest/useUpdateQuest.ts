import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../../lib/axios/axiosInstance';
import { QuestUpdate } from '../../../../services/api/schema/quest_schema';
import { getBaseQuestWithIdEndRoute } from '../../../../services/api/routes/quest_routes';

export const useUpdateQuest = () => {
	return useMutation({
		mutationFn: updateQuest,
	});
};

const updateQuest = async ({
	questId,
	questUpdate,
}: {
	questId: number;
	questUpdate: QuestUpdate;
}) => {
	const response = await axiosInstance.patch(
		getBaseQuestWithIdEndRoute(questId),
		questUpdate,
		{ withCredentials: true }
	);

	if (response.status !== 200) {
		throw new Error('Failed to create new subject');
	}

	return response;
};
