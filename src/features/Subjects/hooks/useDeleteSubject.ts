import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../lib/axios/axiosInstance';
import { getBaseSubjectWithIdEndRoute } from '../../../services/api/routes/subject_routes';

export const useDeleteSubject = () => {
	return useMutation({
		mutationFn: deleteSubject,
		onError(error) {
			toast.error('Failed to delete subject: ' + error.message);
		},
	});
};

const deleteSubject = async ({ subjectId }: { subjectId: number }) => {
	const response = await axiosInstance.delete(
		getBaseSubjectWithIdEndRoute(subjectId),
		{ withCredentials: true }
	);

	if (response.status !== 200) {
		throw new Error('Failed to delete subject');
	}

	return response;
};
