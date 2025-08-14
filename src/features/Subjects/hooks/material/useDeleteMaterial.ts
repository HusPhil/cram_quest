import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../../lib/axios/axiosInstance';
import { getBaseMaterialEndRoute } from '../../../../services/api/routes/subject_routes';
import { toast } from '../../../../lib/toastify/charLimitedToast';

export const useDeleteMaterial = () => {
	return useMutation({
		mutationFn: createMaterial,
		onSuccess() {
			toast.success('Material deleted successfully', {
				toastId: 'material-delete-success',
			});
		},
		onError(error) {
			toast.error('Operation failed: ' + error.message, {
				toastId: 'material-delete-error',
			});
		},
	});
};

type DeleteMaterialRequestBody = {
	subjectId: number;
	materialId: number;
};

const createMaterial = async ({
	subjectId,
	materialId,
}: DeleteMaterialRequestBody) => {
	const response = await axiosInstance.delete(
		getBaseMaterialEndRoute(subjectId, materialId),
		{ withCredentials: true }
	);

	if (response.status !== 200) {
		throw new Error('Failed to delete subject');
	}

	return response;
};
