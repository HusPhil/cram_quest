import { useCallback } from 'react';
import { useBattleEngineStore } from '../../../Battle/stores/battleEngineStore';
import { useBattleSetupStore } from '../../../Battle/stores/battleSetupStore';
import { useSyncTaskTimings } from '../task/useSyncTaskTimings';
import { useEndBattleSession } from './useEndBattleSession';
import { toast } from 'react-toastify';

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

	const getPlayerAnimation = useBattleEngineStore(
		(state) => state.getPlayerAnimation
	);

	const handleSyncTaskTimings = useCallback(async () => {
		const taskTimingStore = getAllTimings();

		if (battleResult !== 'defeat') {
			setBattleResult('victory');
		}

		try {
			await syncTaskTimingsMutate.mutateAsync({
				taskTimingStore,
			});

			setPlayerActionRef?.current?.('idle');
			clearTimings();
		} catch (err) {
			toast.error('Failed to sync task timings', {
				toastId: 'sync-task-timings-error',
			});
		}
	}, [battleResult]);

	return {
		battleSessionId,
		endBattleSessionMutate,
		handleSyncTaskTimings,
		getPlayerAnimation,
	};
};
