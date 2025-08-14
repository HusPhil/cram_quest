import { axiosInstance } from '../../../lib/axios/axiosInstance';
import {
	refreshTokenEndRoute,
	signInEndRoute,
	signOutEndRoute,
	signUpEndRoute,
} from '../routes/auth_routes';
import { SignInRequest, SignUpRequest } from '../schema/auth_schema';

export async function refreshToken() {
	try {
		const response = await axiosInstance.post(
			refreshTokenEndRoute,
			{},
			{
				withCredentials: true, // needed to send cookies
			}
		);

		return response.data.access_token;
	} catch (error) {
		throw error;
	}
}

export const signUp = async ({
	username,
	email,
	password,
	avatar_url,
}: SignUpRequest) => {
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

export const signIn = async ({ username, password }: SignInRequest) => {
	const formData = new URLSearchParams();
	formData.append('username', username);
	formData.append('password', password);

	const { data: response } = await axiosInstance.post(
		signInEndRoute,
		formData,
		{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			withCredentials: true,
		}
	);

	return response; // Assuming the response from the backend is the user data
};

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
