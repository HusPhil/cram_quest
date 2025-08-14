import { useMutation } from '@tanstack/react-query';
import { SubjectCreate } from '../../../../services/api/schema/subject_schema';
import { axiosInstance } from '../../../../lib/axios/axiosInstance';
import { getCreateSubjectEndRoute } from '../../../../services/api/routes/subject_routes';
import { toast } from '../../../../lib/toastify/charLimitedToast';

export const useCreateSubject = () => {
	return useMutation({
		mutationFn: createSubject,
		onSuccess() {
			toast.success('Subject created successfully', {
				toastId: 'subject-create-success',
			});
		},
		onError(error) {
			toast.error('Operation failed: ' + error.message, {
				toastId: 'subject-create-error',
			});
		},
	});
};

const createSubject = async ({
	playerId,
	subjectCreate,
}: {
	playerId: number;
	subjectCreate: SubjectCreate;
}) => {
	const response = await axiosInstance.post(
		getCreateSubjectEndRoute(playerId),
		subjectCreate,
		{ withCredentials: true }
	);

	if (response.status !== 200) {
		throw new Error('Failed to create new subject');
	}

	return response;
};
