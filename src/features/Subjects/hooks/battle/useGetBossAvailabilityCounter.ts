import { useQuery } from '@tanstack/react-query';
import { getPlayerBossAvailabilityCounter } from '../../../../services/api/crud/player_crud';
import { toast } from '../../../../lib/toastify/charLimitedToast';

export const useGetBossAvailabilityCounter = (playerId?: number) => {
	const bossAvailabilityCounterQuery = useQuery({
		queryKey: ['player', playerId, 'boss_availability_counter'],
		queryFn: () => getPlayerBossAvailabilityCounter(playerId!),
		enabled: !!playerId,
	});

	if (bossAvailabilityCounterQuery.isError)
		toast.error('Counting ritual charges failed', {
			toastId: 'latest-boss_availability_counter-error',
		});

	return bossAvailabilityCounterQuery;
};
