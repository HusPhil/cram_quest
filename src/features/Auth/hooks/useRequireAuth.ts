// src/features/Auth/hooks/useSignIn.ts
import { useMutation } from '@tanstack/react-query';
import { refreshAccessToken, setAuthHeader } from '../../../lib/axios/token';

export const useRequireAuth = () => {
	return useMutation({
		mutationFn: refreshAccessToken,
		onSuccess(data) {
			if (!data.access_token) throw Error('No access token acquired');
			setAuthHeader(data.access_token);
		},
		onError(error, variables, context) {
			console.log('error: ', error);
			console.log('variables: ', variables);
			console.log('context: ', context);
		},
	});
};
