// src/features/Auth/hooks/useSignIn.ts
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../../context/AuthContext';
import { refreshAccessToken, setAuthHeader } from '../../../lib/axios/token';

export const useRequireAuth = () => {
	const { setAccessToken, setCurrentUserId: setCurrentUser } = useAuth();

	return useMutation({
		mutationFn: refreshAccessToken,
		onSuccess(data) {
			if (!data.access_token) throw Error('No access token acquired');
			setAuthHeader(data.access_token);
			setAccessToken(data.access_token);
			setCurrentUser(data.user_id);
		},
		onError(error, variables, context) {
			console.log('error: ', error);
			console.log('variables: ', variables);
			console.log('context: ', context);
		},
	});
};
