import { useCallback } from 'react';
import { TaskRead } from '../../../../services/api/schema/task_schema';
import { useBattleEngineStore } from '../../stores/battleEngineStore';
import { useBattleSetupStore } from '../../stores/battleSetupStore';
import { useSyncTaskTimings } from '../task/useSyncTaskTimings';
import { useEndBattleSession } from './useEndBattleSession';
import { BattleSessionRead } from '../../../../services/api/schema/battle_session_schema';
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

	return useCallback(() => {
		const taskTimingStore = getAllTimings();

		if (battleResult !== 'defeat') {
			setBattleResult('victory');
		}
		syncTaskTimingsMutate.mutate(
			{
				taskTimingStore,
			},
			{
				onSuccess: () => {
					if (!battleSessionId) return;

					endBattleSessionMutate.mutate(
						{
							battleSessionId,
						},
						{
							onSuccess: (
								battleSessionResult: BattleSessionRead
							) => {
								setPlayerActionRef?.current('idle');
								console.log(
									'battleSessionResult: ',
									battleSessionResult
								);
								clearTimings();
								toast.success('Quest completed!', {
									toastId: 'quest-completed',
								});
							},
						}
					);
				},
				onError: () => {
					toast.error('Failed to sync task timings', {
						toastId: 'sync-task-timings-error',
					});
				},
			}
		);
	}, [battleResult]);
};
