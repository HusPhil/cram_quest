import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
	BattleSessionRead,
	BattleSessionResume,
} from '../../../../services/api/schema/battle_session_schema';
import { fetcher } from '../../../../services/api/fetcher';
import { getResumeBattleSessionEndRoute } from '../../../../services/api/routes/battle_session';
import { QuestRead } from '../../../../services/api/schema/quest_schema';

export const useGetResumableBattleSession = (
	handleOpenResumeScreen: (
		sessionData?: BattleSessionRead,
		questData?: QuestRead
	) => void
) => {
	const resumableBattleSessionQuery = useQuery({
		queryKey: ['study_sessions', 'resume'],
		queryFn: getResumableBattleSession,
	});

	if (resumableBattleSessionQuery.isError) {
		toast.error('Failed to load player skins', {
			toastId: 'load-player-skins-error',
		});
	} else if (resumableBattleSessionQuery.data?.is_resumable) {
		handleOpenResumeScreen(
			resumableBattleSessionQuery.data?.session_data!,
			resumableBattleSessionQuery.data?.quest_data!
		);
	}

	return resumableBattleSessionQuery;
};

export const getResumableBattleSession =
	async (): Promise<BattleSessionResume> => {
		const response = await fetcher(getResumeBattleSessionEndRoute);

		if (response.status !== 200) {
			throw new Error('Failed to get resumable battle session');
		}

		return response.data;
	};
