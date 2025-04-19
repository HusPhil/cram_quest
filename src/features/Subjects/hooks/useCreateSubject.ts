import { useMutation } from '@tanstack/react-query';
import { SubjectCreate } from '../../../services/api/schema/subject_schema';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../lib/axios/axiosInstance';
import { getCreateSubjectEndRoute } from '../../../services/api/routes/subject_routes';

export const useCreateSubject = () => {
	return useMutation({
		mutationFn: createSubject,
		onSuccess(data, variables, context) {
			console.log('data: ', data);
			console.log('variables: ', variables);
			console.log('context: ', context);
			toast.success('Subject created successfully');
		},
		onError(error, variables, context) {
			// alert('An ERROR OCCURED: ' + error.response.data.detail);
			toast.error('An ERROR OCCURED: ' + error.message);
			// console.log("errorMessage: ", error.response.data.detail);
			console.log('error: ', error);
			console.log('variables: ', variables);
			console.log('context: ', context);
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
