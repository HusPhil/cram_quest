import { useCallback, useEffect, useRef } from 'react';
import { useBattleEngineStore } from '../../../Battle/stores/battleEngineStore';
import { useBattleSetupStore } from '../../../Battle/stores/battleSetupStore';
import { useSyncTaskTimings } from '../task/useSyncTaskTimings';
import { useEndBattleSession } from './useEndBattleSession';
import { toast } from '../../../../lib/toastify/charLimitedToast';

interface BattleQuestCompletionProps {
	battleResult: 'defeat' | 'victory' | null;
	getAllTimings: () => any;
	clearTimings: () => void;
}

export const useBattleQuestCompletion = ({
	battleResult,
	getAllTimings,
	clearTimings,
}: BattleQuestCompletionProps) => {
	const syncTaskTimingsMutate = useSyncTaskTimings();
	const endBattleSessionMutate = useEndBattleSession();

	const battleSessionId = useBattleSetupStore(
		(state) => state.battleSessionId
	);
	const setBattleResult = useBattleSetupStore(
		(state) => state.setBattleResult
	);

	const setPlayerActionRef = useBattleEngineStore(
		(state) => state.setPlayerActionRef
	);

	const endBattleTriggeredRef = useRef(false);

	useEffect(() => {
		endBattleTriggeredRef.current = false;
	}, [battleSessionId]);

	const getPlayerAnimation = useBattleEngineStore(
		(state) => state.getPlayerAnimation
	);

	const handleSyncTaskTimings = useCallback(async () => {
		const taskTimingStore = getAllTimings();

		try {
			await syncTaskTimingsMutate.mutateAsync({
				taskTimingStore,
			});

			setPlayerActionRef?.current?.('idle');
			clearTimings();
		} catch (err) {
			toast.error('Syncing tasks failed', {
				toastId: 'sync-task-timings-error',
			});
		}
	}, [battleResult]);

	const handleEndBattleSession = useCallback(async () => {
		if (endBattleTriggeredRef.current) return;
		endBattleTriggeredRef.current = true;

		await handleSyncTaskTimings();
		endBattleSessionMutate.mutate(
			{ battleSessionId: battleSessionId! },
			{
				onSuccess: (data) => {
					if (data.status !== 'defeat') {
						toast.success('Congratulations!', {
							toastId: 'end-battle-session',
						});
						setBattleResult('victory');
					} else {
						toast.info('Better luck next time…', {
							toastId: 'end-battle-session',
						});
						setBattleResult('defeat');
					}
				},
				onError: () => {
					toast.error('Ending battle session failed', {
						toastId: 'end-battle-session-error',
					});
					setBattleResult('defeat');
				},
			}
		);
	}, [handleSyncTaskTimings, battleSessionId, endBattleSessionMutate, setBattleResult]);

	return {
		battleSessionId,
		endBattleSessionMutate,
		handleEndBattleSession,
		handleSyncTaskTimings,
		getPlayerAnimation,
	};
};
