// src/features/Auth/hooks/useSignIn.ts
import { useMutation } from '@tanstack/react-query';
import { signUp } from '../../../services/api/crud/auth_crud';
import { useAuthInformationStore } from '../store/authInformationStore';

const useSignUp = () => {
	return useMutation({
		mutationFn: signUp,
		onSuccess(data) {
			const setCurrentUserId =
				useAuthInformationStore.getState().setUserId;
			setCurrentUserId(data.user_id);
		},
		onError(error) {
			console.error('error: ', error);
		},
	});
};

export default useSignUp;
