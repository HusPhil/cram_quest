import { axiosInstance } from '../../../lib/axios/axiosInstance';
import { getSubjectByIdRoute } from '../routes/subject_routes';

export const getSubject = async ({ subject_id }: { subject_id: number }) => {
	const { data: response } = await axiosInstance.get(
		getSubjectByIdRoute(subject_id)
	);

	return response; // Assuming the response from the backend is the user data
};
