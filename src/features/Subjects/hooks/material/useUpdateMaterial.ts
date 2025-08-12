import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../../lib/axios/axiosInstance';
import { MaterialUpdate } from '../../../../services/api/schema/material_schema';
import { getBaseMaterialEndRoute } from '../../../../services/api/routes/subject_routes';

export const useUpdateMaterial = () => {
	return useMutation({
		mutationFn: updateMaterial,
		onSuccess() {
			toast.success('Updated successfully', {
				toastId: 'material-update-success',
			});
		},
		onError(error) {
			toast.error('Failed to create subject material: ' + error.message, {
				toastId: 'material-update-error',
			});
		},
	});
};

type UpdateMaterialRequestBody = {
	subjectId: number;
	materialId: number;
	materialUpdate: MaterialUpdate;
};

const updateMaterial = async ({
	subjectId,
	materialId,
	materialUpdate: materialUpdate,
}: UpdateMaterialRequestBody) => {
	const response = await axiosInstance.patch(
		getBaseMaterialEndRoute(subjectId, materialId),
		materialUpdate,
		{ withCredentials: true }
	);

	if (response.status !== 200) {
		throw new Error('Failed to update new subject');
	}

	return response;
};
