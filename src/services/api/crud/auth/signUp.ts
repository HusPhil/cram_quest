import { axiosInstance } from '../../../../lib/axios/axiosInstance';
import { signUpEndRoute } from '../../router/auth_router';
import { SignUpSchema } from '../../schema/auth_schema';

export const signUp = async ({
	username,
	email,
	password,
	avatar_url,
}: SignUpSchema) => {
	const { data: response } = await axiosInstance.post(
		signUpEndRoute,
		{
			username,
			email,
			password,
			avatar_url,
		},
		{
			withCredentials: true,
		}
	);

	return response;
};
