// src/features/Auth/hooks/useSignIn.ts
import { useMutation } from '@tanstack/react-query';
import { signOut } from '../../../services/api/crud/auth_crud';

const useSignOut = () => {
	return useMutation({
		mutationFn: signOut,
	});
};

export default useSignOut;
