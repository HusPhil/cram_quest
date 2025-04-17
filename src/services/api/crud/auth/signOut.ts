import { axiosInstance } from '../../../../lib/axios/axiosInstance';
import { signOutEndRoute } from '../../router/auth_router';

export const signOut = async () => {
	const { data: response } = await axiosInstance.post(
		signOutEndRoute,
		{},
		{
			withCredentials: true,
		}
	);

	return response;
};
