import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getLatestBossBattleStatus } from '../../../../services/api/crud/boss_battle_status_crud';

export const useGetLatestBossBattleStatus = (playerId?: number) => {
	const latestBossBattleStatus = useQuery({
		queryKey: ['boss_battle_status', 'player', playerId, 'latest'],
		queryFn: () => getLatestBossBattleStatus(playerId!),
		enabled: !!playerId,
	});

	if (latestBossBattleStatus.isError)
		toast.error('Failed to load boss battle status', {
			toastId: 'latest-boss_battle_status-error',
		});

	return latestBossBattleStatus;
};
