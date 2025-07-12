// src/features/Auth/hooks/useSignIn.ts
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../../services/api/crud/auth_crud';

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
			console.log('error: ', error);
			console.log('variables: ', variables);
			console.log('context: ', context);
		},
	});
};
