import { axiosInstance } from '../../../lib/axios/axiosInstance';
import {
	getBaseSubjectWithIdEndRoute,
	getSubjectQuestsEndRoute,
} from '../routes/subject_routes';

import { MaterialRead } from '../schema/material_schema';
import { getMaterialEndRoute } from '../routes/subject_routes';
import {fetcher} from '../fetcher';

export const getSubject = async ({ subject_id }: { subject_id: number }) => {
	const { data: response } = await axiosInstance.get(
		getBaseSubjectWithIdEndRoute(subject_id)
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



export const getSubjectMaterials = async (
	subject_id: number 
): Promise <MaterialRead[]> => {
	const response = await fetcher(getMaterialEndRoute(subject_id));

	if (response.status !== 200) {
		throw new Error('Failed to fetch subject materials');
	}

	console.log('getSubjectMaterials response: ', response.data);

	return response.data;
}