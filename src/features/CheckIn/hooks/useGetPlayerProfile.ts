import { useQuery } from '@tanstack/react-query';
import { getPlayerProfile } from '../../../services/api/crud/player_crud';
import { toast } from 'react-toastify';

export const useGetPlayerProfile = (playerId: number | undefined) => {
	const profileQuery = useQuery({
		queryKey: ['player', playerId, 'profile'],
		queryFn: () => getPlayerProfile(playerId!),
		enabled: !!playerId,
	});

	if (profileQuery.isError)
		toast.error('Failed to load player profile', {
			toastId: 'player-profile-error',
		});

	return profileQuery;
};
