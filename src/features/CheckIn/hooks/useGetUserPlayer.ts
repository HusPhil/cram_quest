import { useQuery } from '@tanstack/react-query';
import { getUserPlayer } from '../../../services/api/crud/user_crud';

export const useGetUserPlayer = (userId: number) => {
	const playerQuery = useQuery({
		queryKey: ['user', userId, 'player'],
		queryFn: () => getUserPlayer(userId),
	});

	console.log('playerQuery', playerQuery);

	return playerQuery;
};
