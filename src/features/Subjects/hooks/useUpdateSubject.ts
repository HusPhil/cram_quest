import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../lib/axios/axiosInstance';
import { QuestUpdate } from '../../../services/api/schema/quest_schema';
import { getBaseQuestWithIdEndRoute } from '../../../services/api/routes/quest_routes';
import { SubjectUpdate } from '../../../services/api/schema/subject_schema';
import { getBaseSubjectWithIdEndRoute } from '../../../services/api/routes/subject_routes';

export const useUpdateSubject = () => {
	return useMutation({
		mutationFn: updateSubject,
	});
};

const updateSubject = async ({
	subjectId,
	subjectUpdate,
}: {
	subjectId: number;
	subjectUpdate: SubjectUpdate;
}) => {
	console.log('subjectUpdate: ', subjectUpdate);
	const response = await axiosInstance.patch(
		getBaseSubjectWithIdEndRoute(subjectId),
		subjectUpdate,
		{ withCredentials: true }
	);

	if (response.status !== 200) {
		throw new Error('Failed to create new subject');
	}

	return response;
};
