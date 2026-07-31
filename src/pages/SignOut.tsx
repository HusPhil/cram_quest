import { useNavigate } from 'react-router-dom';
import useSignOut from '../features/Auth/hooks/useSignOut';
import SignOutModal from '../features/Auth/modals/SignOutModal';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '../lib/toastify/charLimitedToast';

export default function SignOut() {
	const signOutMutate = useSignOut();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const handleSignOut = async () => {
		queryClient.clear();
		await signOutMutate.mutateAsync();
		navigate('/auth');
		toast.success('Signed out successfully', {
			toastId: 'sign-out-success',
		});
	};

	return (
		<div className="flex h-full w-full  justify-center items-center">
			<SignOutModal
				handleSignOut={handleSignOut}
				isSigningOut={signOutMutate.isPending}
			/>
		</div>
	);
}
