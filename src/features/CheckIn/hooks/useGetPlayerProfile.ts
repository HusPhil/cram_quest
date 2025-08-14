import { useQuery } from '@tanstack/react-query';
import { getPlayerProfile } from '../../../services/api/crud/player_crud';
import { toast } from '../../../lib/toastify/charLimitedToast';

export const useGetPlayerProfile = (playerId: number | undefined) => {
	const profileQuery = useQuery({
		queryKey: ['player', playerId, 'profile'],
		queryFn: () => getPlayerProfile(playerId!),
		enabled: !!playerId,
	});

	if (profileQuery.isError)
		toast.error('Player profile not found', {
			toastId: 'player-profile-error',
		});

	return profileQuery;
};
