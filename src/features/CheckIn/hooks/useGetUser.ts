import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../../services/api/crud/user_crud';
import { toast } from 'react-toastify';
import { useAuthInformationStore } from '../../Auth/store/authInformationStore';
import { useUserPlayerStore } from '../../Auth/store/userPlayerStore';

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
		const setCurrentUserDetails =
			useUserPlayerStore.getState().setUserDetails;
		setCurrentUserDetails(
			userQuery.data.id,
			userQuery.data.username,
			userQuery.data.email,
			userQuery.data.is_admin,
			userQuery.data.is_active
		);
	}

	return userQuery;
};
