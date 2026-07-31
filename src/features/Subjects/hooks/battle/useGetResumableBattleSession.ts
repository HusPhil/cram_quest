import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
	BattleSessionRead,
	BattleSessionResume,
} from '../../../../services/api/schema/battle_session_schema';
import { fetcher } from '../../../../services/api/fetcher';
import { getResumeBattleSessionEndRoute } from '../../../../services/api/routes/battle_session';
import { QuestRead } from '../../../../services/api/schema/quest_schema';
import { toast } from '../../../../lib/toastify/charLimitedToast';

export const useGetResumableBattleSession = (
	handleOpenResumeScreen: (
		currentTime: string,
		sessionData?: BattleSessionRead,
		questData?: QuestRead,
	) => void,
	isBattleActive: boolean,
) => {
	const resumableBattleSessionQuery = useQuery({
		queryKey: ['study_sessions', 'resume'],
		queryFn: getResumableBattleSession,
		refetchOnWindowFocus: 'always',
		enabled: !isBattleActive,
	});

	// Keep the latest handler without re-running the effect every render.
	const handleOpenResumeScreenRef = useRef(handleOpenResumeScreen);
	useEffect(() => {
		handleOpenResumeScreenRef.current = handleOpenResumeScreen;
	});

	// Only act on the most recently fetched resume data. When a battle is
	// cleaned up the query re-enables and refetches, but the cached data can
	// still report the just-finished session as resumable until the refetch
	// resolves; that stale data must not reopen the resume screen.
	const openedForRef = useRef<{ updatedAt: number } | null>(null);

	useEffect(() => {
		if (isBattleActive) return;

		if (resumableBattleSessionQuery.isError) {
			toast.error('Resuming battle failed', {
				toastId: 'resume-battle-error',
			});
			return;
		}

		const data = resumableBattleSessionQuery.data;
		if (!data?.is_resumable) return;
		if (!data.session_data || !data.quest_data || !data.current_time) return;

		// A session whose tasks all have end times is finished; never auto-
		// resume it, even if a stale response still claims it is resumable.
		const allTasksEnded =
			data.session_data.tasks.length > 0 &&
			data.session_data.tasks.every((task) => !!task.end_time);
		if (allTasksEnded) return;

		const updatedAt = resumableBattleSessionQuery.dataUpdatedAt;
		if (openedForRef.current?.updatedAt === updatedAt) return;
		openedForRef.current = { updatedAt };

		handleOpenResumeScreenRef.current(
			data.current_time,
			data.session_data,
			data.quest_data,
		);
	}, [
		resumableBattleSessionQuery.data,
		resumableBattleSessionQuery.dataUpdatedAt,
		resumableBattleSessionQuery.isError,
		isBattleActive,
	]);

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
