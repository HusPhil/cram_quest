import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../../services/api/crud/user_crud';
import { toast } from 'react-toastify';

export const useGetUser = (userId: number) => {
	const userQuery = useQuery({
		queryKey: ['users', userId],
		queryFn: () => getUser(userId),
	});

	if (userQuery.isError)
		toast.error('Failed to load user', {
			toastId: 'user-error',
		});

	return userQuery;
};
