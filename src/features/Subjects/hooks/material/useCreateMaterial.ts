import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../../lib/axios/axiosInstance';
import { MaterialCreate } from '../../../../services/api/schema/material_schema';
import { getMaterialEndRoute } from '../../../../services/api/routes/subject_routes';
import { toast } from '../../../../lib/toastify/charLimitedToast';

export const useCreateMaterial = () => {
	return useMutation({
		mutationFn: createMaterial,
		onSuccess() {
			toast.success('Material created successfully', {
				toastId: 'material-create-success',
			});
		},
		onError(error) {
			toast.error('Operation failed: ' + error.message, {
				toastId: 'material-create-error',
			});
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
