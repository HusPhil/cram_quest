import { useMutation } from '@tanstack/react-query';
import { SubjectCreate } from '../../../services/api/schema/subject_schema';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../lib/axios/axiosInstance';
import { getCreateSubjectEndRoute } from '../../../services/api/routes/subject_routes';
import {
	QuestCreate,
	QuestUpdate,
} from '../../../services/api/schema/quest_schema';
import { getBaseQuestEndRoute } from '../../../services/api/routes/quest_routes';

export const useUpdateQuest = () => {
	return useMutation({
		mutationFn: updateQuest,
	});
};

const updateQuest = async ({ questUpdate }: { questUpdate: QuestUpdate }) => {
	console.log('questUpdate: ', questUpdate);
	const response = await axiosInstance.patch(
		getBaseQuestEndRoute(),
		questUpdate,
		{ withCredentials: true }
	);

	if (response.status !== 200) {
		throw new Error('Failed to create new subject');
	}

	return response;
};
