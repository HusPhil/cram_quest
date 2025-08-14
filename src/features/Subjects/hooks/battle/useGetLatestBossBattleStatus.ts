import { useQuery } from '@tanstack/react-query';
import { getLatestBossBattleStatus } from '../../../../services/api/crud/boss_battle_status_crud';
import { toast } from '../../../../lib/toastify/charLimitedToast';

export const useGetLatestBossBattleStatus = (playerId?: number) => {
	const latestBossBattleStatus = useQuery({
		queryKey: ['boss_battle_status', 'player', playerId, 'latest'],
		queryFn: () => getLatestBossBattleStatus(playerId!),
		enabled: !!playerId,
	});

	if (latestBossBattleStatus.isError)
		toast.error('Boss status not found', {
			toastId: 'latest-boss-battle-status-error',
		});

	return latestBossBattleStatus;
};
