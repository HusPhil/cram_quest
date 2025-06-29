import { useMutation } from '@tanstack/react-query';
import { SubjectCreate } from '../../../services/api/schema/subject_schema';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../lib/axios/axiosInstance';
import { getCreateSubjectEndRoute } from '../../../services/api/routes/subject_routes';
import { QuestCreate } from '../../../services/api/schema/quest_schema';
import { getBaseQuestEndRoute } from '../../../services/api/routes/quest_routes';

export const useCreateQuest = () => {
	return useMutation({
		mutationFn: createQuest,
		onSuccess(data, variables, context) {
			toast.success('Quest created successfully');
		},
		onError(error, variables, context) {
			toast.error('Failed to create quest: ' + error.message);
		},
	});
};

const createQuest = async ({ questCreate }: { questCreate: QuestCreate }) => {
	console.log('questCreate: ', questCreate);
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
