import { useMutation } from '@tanstack/react-query';
import { SubjectCreate } from '../../../services/api/schema/subject_schema';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../lib/axios/axiosInstance';
import { getCreateSubjectEndRoute } from '../../../services/api/routes/subject_routes';
import { QuestCreate } from '../../../services/api/schema/quest_schema';
import {
	getBaseQuestEndRoute,
	getBaseQuestWithIdEndRoute,
} from '../../../services/api/routes/quest_routes';

export const useDeleteQuest = () => {
	return useMutation({
		mutationFn: deleteQuest,
		onError(error) {
			toast.error('Failed to delete quest: ' + error.message);
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
