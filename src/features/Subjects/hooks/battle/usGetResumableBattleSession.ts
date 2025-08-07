import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { BattleSessionResume } from '../../../../services/api/schema/battle_session_schema';
import { fetcher } from '../../../../services/api/fetcher';
import { getResumeBattleSessionEndRoute } from '../../../../services/api/routes/battle_session';

export const useGetResumableBattleSession = () => {
	const playerSkinsQuery = useQuery({
		queryKey: ['study_sessions', 'resume'],
		queryFn: getResumableBattleSession,
		refetchOnWindowFocus: true,
	});

	if (playerSkinsQuery.isError)
		toast.error('Failed to load player skins', {
			toastId: 'load-player-skins-error',
		});

	return playerSkinsQuery;
};

export const getResumableBattleSession =
	async (): Promise<BattleSessionResume> => {
		const response = await fetcher(getResumeBattleSessionEndRoute);

		if (response.status !== 200) {
			throw new Error('Failed to get resumable battle session');
		}

		console.log('getResumableBattleSession response: ', response.data);

		return response.data;
	};
