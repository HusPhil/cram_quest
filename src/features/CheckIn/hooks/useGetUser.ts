import { useQuery } from '@tanstack/react-query';

export const useGetUserPlayer = (playerId: number) => {
	const playerQuery = useQuery({
		queryKey: ['players', playerId],
		queryFn: () => getUserPlayer(playerId),
	});

	console.log('playerQuery', playerQuery);

	return playerQuery;
};
