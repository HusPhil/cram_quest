// src/features/Auth/hooks/useSignIn.ts
import { useMutation } from '@tanstack/react-query';
import { signUp } from '../../../services/api/crud/auth_crud';
import { usePlayerInformationStore } from '../store/playerInformationStore';

const useSignUp = () => {
	return useMutation({
		mutationFn: signUp,
		onSuccess(data) {
			const setCurrentUserId =
				usePlayerInformationStore.getState().setUserId;
			setCurrentUserId(data.user_id);
		},
		onError(error) {
			console.error('error: ', error);
		},
	});
};

export default useSignUp;
