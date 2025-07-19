// src/features/Auth/hooks/useSignIn.ts
import { useMutation } from '@tanstack/react-query';
import { signUp } from '../../../services/api/crud/auth_crud';
import { useAuthInformationStore } from '../stores/authInformationStore';
import { useNavigate } from 'react-router-dom';

const useSignUp = () => {
	const navigate = useNavigate();
	return useMutation({
		mutationFn: signUp,
		onSuccess(data) {
			const setCurrentUserId =
				useAuthInformationStore.getState().setUserId;
			setCurrentUserId(data.user_id);
			navigate('/home');
		},
		onError(error) {
			console.error('error: ', error);
		},
	});
};

export default useSignUp;
