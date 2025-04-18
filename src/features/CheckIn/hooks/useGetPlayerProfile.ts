import { useQuery } from '@tanstack/react-query';
import { getPlayerProfile } from '../../../services/api/crud/player_crud';

export const useGetPlayerProfile = (playerId: number | undefined) => {
	const profileQuery = useQuery({
		queryKey: ['player', playerId, 'profile'],
		queryFn: () => getPlayerProfile(playerId!),
		enabled: !!playerId,
	});

	console.log('profileQuery', profileQuery);

	return profileQuery;
};
