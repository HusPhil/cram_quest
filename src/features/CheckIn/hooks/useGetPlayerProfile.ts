import { useQuery } from '@tanstack/react-query';
import { getPlayerProfile } from '../../../services/api/crud/player_crud';

export const useGetPlayerProfile = (
	playerId: number | undefined = -1,
	enabled: boolean = true
) => {
	const playerQuery = useQuery({
		queryKey: ['players', playerId],
		queryFn: () => getPlayerProfile(playerId),
		enabled: enabled,
	});

	console.log('playerQuery', playerQuery);

	return playerQuery;
};
