import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../../services/api/crud/user_crud';

export const useGetUser = (playerId: number) => {
	const playerQuery = useQuery({
		queryKey: ['players', playerId],
		queryFn: () => getUser(playerId),
	});

	console.log('playerQuery', playerQuery);

	return playerQuery;
};
