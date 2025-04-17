import { useQuery } from '@tanstack/react-query';
import { getPlayerByUser } from '../../../services/api/crud/user_crud';

export const useGetPlayerByUser = (playerId: number) => {
	const playerQuery = useQuery({
		queryKey: ['players', playerId],
		queryFn: () => getPlayerByUser(playerId),
	});

	console.log('playerQuery', playerQuery);

	return playerQuery;
};
