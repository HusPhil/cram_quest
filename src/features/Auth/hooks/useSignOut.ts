// src/features/Auth/hooks/useSignIn.ts
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../../context/AuthContext';
import { signOut } from '../../../services/api/crud/auth/signOut';
import { useNavigate } from 'react-router-dom';

const useSignOut = () => {
	const navigate = useNavigate();
	return useMutation({
		mutationFn: signOut,
		onSuccess(data) {
			console.log(data);
			navigate('/auth');
		},
		onError(error) {
			console.error('error: ', error);
		},
	});
};

export default useSignOut;
