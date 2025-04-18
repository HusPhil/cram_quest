import { useQuery } from '@tanstack/react-query';
import { getUserPlayer } from '../../../services/api/crud/user_crud';

export const useGetUserPlayer = (playerId: number) => {
	const playerQuery = useQuery({
		queryKey: ['players', playerId],
		queryFn: () => getUserPlayer(playerId),
	});

	console.log('playerQuery', playerQuery);

	return playerQuery;
};
