// src/features/Auth/hooks/useSignIn.ts
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../../context/AuthContext';
import { refreshAccessToken, setAuthHeader } from '../../../lib/axios/token';

export const useRequireAuth = () => {
	const { setAccessToken } = useAuth();

	return useMutation({
		mutationFn: refreshAccessToken,
		onSuccess(accessToken) {
			if (!accessToken) throw Error('No access token acquired');
			setAuthHeader(accessToken);
			setAccessToken(accessToken);
		},
		onError(error, variables, context) {
			console.log('error: ', error);
			console.log('variables: ', variables);
			console.log('context: ', context);
		},
	});
};
