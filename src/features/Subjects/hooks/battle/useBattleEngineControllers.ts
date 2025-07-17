import { useCallback, useRef } from 'react';
import { QueueCustomSceneFn } from '../../../Battle/hooks/useBattleEngine';

export interface BattleEngineControllers {
	queueCustomSceneFn: QueueCustomSceneFn;
	getNewEnemyFn: () => void;
}

export const useBattleEngineControllers = () => {
	const getNewEnemyRef = useRef<() => void>(null);
	const queueCustomSceneRef = useRef<QueueCustomSceneFn>(null);

	const initializeBattleEngineControllers = useCallback(
		({ queueCustomSceneFn, getNewEnemyFn }: BattleEngineControllers) => {
			queueCustomSceneRef.current = queueCustomSceneFn;
			getNewEnemyRef.current = getNewEnemyFn;
		},
		[]
	);

	return {
		queueCustomSceneRef,
		getNewEnemyRef,
		initializeBattleEngineControllers,
	};
};
