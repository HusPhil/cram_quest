// src/features/Auth/hooks/useSignIn.ts
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../../context/AuthContext';
import { signUp } from '../../../services/api/crud/auth_crud';

const useSignUp = () => {
	const { setAccessToken } = useAuth();

	return useMutation({
		mutationFn: signUp,
		onSuccess(data) {
			alert('Successfully signed up');
			setAccessToken(data.access_token);
		},
		onError(error) {
			console.error('error: ', error);
		},
	});
};

export default useSignUp;
