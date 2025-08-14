import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../../services/api/crud/user_crud';
import { useAuthInformationStore } from '../../Auth/stores/authInformationStore';
import { useUserPlayerStore } from '../../Auth/stores/userPlayerStore/userPlayerStore';
import { toast } from '../../../lib/toastify/charLimitedToast';

export const useGetUser = (userId: number) => {
	const userQuery = useQuery({
		queryKey: ['users', userId],
		queryFn: () => getUser(userId),
	});

	if (userQuery.isError) {
		toast.error('User not found', {
			toastId: 'user-error',
		});
	}

	const setCurrentUserId = useAuthInformationStore.getState().setUserId;

	if (userQuery.data?.id) {
		setCurrentUserId(userQuery.data?.id);
	}

	if (userQuery.data) {
		const setCurrentUserDetails = useUserPlayerStore.getState().setUser;
		setCurrentUserDetails({
			userId: userQuery.data.id!,
			username: userQuery.data.username!,
			email: userQuery.data.email!,
			is_active: userQuery.data.is_active!,
			is_admin: userQuery.data.is_admin!,
		});
	}

	return userQuery;
};
