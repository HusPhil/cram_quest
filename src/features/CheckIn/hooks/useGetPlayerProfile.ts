import { useQuery } from '@tanstack/react-query';
import { getPlayerProfile } from '../../../services/api/crud/player_crud';
import { toast } from 'react-toastify';
import { useUserPlayerStore } from '../../Auth/stores/userPlayerStore';

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

	if (profileQuery.data) {
		const setCurrentPlayerProfile =
			useUserPlayerStore.getState().setPlayerProfile;
		setCurrentPlayerProfile(
			profileQuery.data.id!,
			profileQuery.data.avatar_url!,
			profileQuery.data.bio!,
			profileQuery.data.mood!
		);
	}

	return profileQuery;
};
