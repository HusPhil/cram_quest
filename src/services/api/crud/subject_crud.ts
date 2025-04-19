import { axiosInstance } from '../../../lib/axios/axiosInstance';
import {
	getSubjectByIdEndRoute,
	getSubjectQuestsEndRoute,
} from '../routes/subject_routes';

export const getSubject = async ({ subject_id }: { subject_id: number }) => {
	const { data: response } = await axiosInstance.get(
		getSubjectByIdEndRoute(subject_id)
	);

	return response; // Assuming the response from the backend is the user data
};

export const getSubjectQuests = async ({
	subject_id,
}: {
	subject_id: number;
}) => {
	const { data: response } = await axiosInstance.get(
		getSubjectQuestsEndRoute(subject_id)
	);

	return response; // Assuming the response from the backend is the user data
};
