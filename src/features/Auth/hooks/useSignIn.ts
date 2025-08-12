// src/features/Auth/hooks/useSignIn.ts
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../../services/api/crud/auth_crud';

export const useSignIn = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: signIn,
		onSuccess() {
			navigate('/home');
		},
	});
};
