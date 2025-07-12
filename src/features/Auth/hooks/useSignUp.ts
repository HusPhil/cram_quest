// src/features/Auth/hooks/useSignIn.ts
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../../context/AuthContext';
import { signUp } from '../../../services/api/crud/auth_crud';

const useSignUp = () => {
	const { setCurrentUserId } = useAuth();

	return useMutation({
		mutationFn: signUp,
		onSuccess(data) {
			setCurrentUserId(data.user_id);
		},
		onError(error) {
			console.error('error: ', error);
		},
	});
};

export default useSignUp;
