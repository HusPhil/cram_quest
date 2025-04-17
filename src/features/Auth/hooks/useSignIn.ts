// src/features/Auth/hooks/useSignIn.ts
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../../context/AuthContext';
import { signIn } from '../../../services/api/crud/auth/signIn';
import { setAuthHeader } from '../../../lib/axios/token';
import { Navigate, useNavigate } from 'react-router-dom';

export const useSignIn = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: signIn,
		onSuccess(data, variables, context) {
			console.log('data: ', data);
			console.log('variables: ', variables);
			console.log('context: ', context);

			navigate('/home');
		},
		onError(error, variables, context) {
			alert('An ERROR OCCURED: ' + error.response.data.detail);
			// console.log("errorMessage: ", error.response.data.detail);
			console.log('error: ', error);
			console.log('variables: ', variables);
			console.log('context: ', context);
		},
	});
};
