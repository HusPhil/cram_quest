// src/features/Auth/hooks/useSignIn.ts
import { useMutation } from '@tanstack/react-query';
import { signUp } from '../../../services/api/crud/auth/signUp';
import { useAuth } from '../../../context/AuthContext';

const useSignUp = () => {
	const { setAccessToken } = useAuth();

	return useMutation({
		mutationFn: signUp,
		onSuccess(data, variables, context) {
			console.log('data: ', data);
			console.log('variables: ', variables);
			console.log('context: ', context);
			
            alert('Successfully signed up');

			setAccessToken(data.access_token);
		},
		onError(error, variables, context) {
			console.log('error: ', error);
			console.log('variables: ', variables);
			console.log('context: ', context);
		},
	});
};

export default useSignUp;
