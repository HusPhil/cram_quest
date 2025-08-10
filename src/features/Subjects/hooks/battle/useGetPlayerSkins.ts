import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getPlayerSkins } from '../../../../services/api/crud/player_crud';

export const useGetPlayerSkins = (playerId?: number) => {
	const playerSkinsQuery = useQuery({
		queryKey: ['player', playerId, 'skins'],
		queryFn: () => getPlayerSkins(playerId!),
		refetchOnWindowFocus: true,
		enabled: !!playerId,
	});

	if (playerSkinsQuery.isError)
		toast.error('Failed to load player skins', {
			toastId: 'load-player-skins-error',
		});

	return playerSkinsQuery;
};
