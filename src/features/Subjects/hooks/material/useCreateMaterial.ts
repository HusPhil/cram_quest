import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../../lib/axios/axiosInstance';
import { MaterialCreate } from '../../../../services/api/schema/material_schema';
import { getMaterialEndRoute } from '../../../../services/api/routes/subject_routes';

export const useCreateMaterial = () => {
	return useMutation({
		mutationFn: createMaterial,
		onSuccess(data, variables, context) {
			toast.success('Subject material created successfully');
			console.log('api res:', data, variables, context);
		},
		onError(error, variables, context) {
			toast.error('Failed to create subject material: ' + error.message);
			console.log('error:', error, variables, context);
		},
	});
};

type CreateMaterialRequestBody = {
	subjectId: number;
	materialCreate: MaterialCreate;
};

const createMaterial = async ({
	subjectId,
	materialCreate,
}: CreateMaterialRequestBody) => {
	const response = await axiosInstance.post(
		getMaterialEndRoute(subjectId),
		materialCreate,
		{ withCredentials: true }
	);

	if (response.status !== 200) {
		throw new Error('Failed to create new subject');
	}

	return response;
};
