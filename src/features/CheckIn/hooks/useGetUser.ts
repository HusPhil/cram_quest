import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../../services/api/crud/user_crud';

export const useGetUser = (userId: number) => {
	const userQuery = useQuery({
		queryKey: ['users', userId],
		queryFn: () => getUser(userId),
	});

	console.log('userQuery', userQuery);

	return userQuery;
};
