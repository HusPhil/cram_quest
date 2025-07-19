import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../../services/api/crud/user_crud';
import { toast } from 'react-toastify';
import { useAuthInformationStore } from '../../Auth/stores/authInformationStore';
import { useUserPlayerStore } from '../../Auth/stores/userPlayerStore/userPlayerStore';

export const useGetUser = (userId: number) => {
	const userQuery = useQuery({
		queryKey: ['users', userId],
		queryFn: () => getUser(userId),
	});

	if (userQuery.isError)
		toast.error('Failed to load user', {
			toastId: 'user-error',
		});
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
