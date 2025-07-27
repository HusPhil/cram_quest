import { useCallback, useEffect, useRef, useState } from 'react';
import { BattleContext, BattleStepFn } from '../battleEngine/types';
import { AnimationStateType } from './useCharacterAnimation';
import { defaultBattleScene } from '../battleEngine/scenes/default/defaultBattleScene';
import { sceneName } from '../battleEngine/scenes/sceneNames';
import { useBattleEngineStore } from '../stores/battleEngineStore';

export interface CustomSceneConfig {
	sceneSteps: BattleStepFn[];
	sceneName: sceneName;
	onComplete?: (sceneName?: sceneName) => void;
	onLastStepIndex?: (sceneName?: sceneName) => void;
}
export type QueueCustomSceneFn = (config: CustomSceneConfig) => void;

export const useBattleEngine = (scene: BattleStepFn[]) => {
	const [stepIndex, setStepIndex] = useState(-1);
	const [loop, setLoop] = useState(false);
	const [currentSteps, setCurrentSteps] = useState<BattleStepFn[]>(scene);
	const [customSceneActive, setCustomSceneActive] = useState(false);

	const playerPosX = useBattleEngineStore((state) => state.playerPosX);
	const playerZ = useBattleEngineStore((state) => state.playerZ);
	const playerLoop = useBattleEngineStore((state) => state.playerLoop);

	const setPlayerPosX = useBattleEngineStore((state) => state.setPlayerPosX);
	const setPlayerZ = useBattleEngineStore((state) => state.setPlayerZ);
	const setPlayerLoop = useBattleEngineStore((state) => state.setPlayerLoop);

	const enemyPosX = useBattleEngineStore((state) => state.enemyPosX);
	const enemyZ = useBattleEngineStore((state) => state.enemyZ);
	const enemyLoop = useBattleEngineStore((state) => state.enemyLoop);

	const setEnemyPosX = useBattleEngineStore((state) => state.setEnemyPosX);
	const setEnemyZ = useBattleEngineStore((state) => state.setEnemyZ);
	const setEnemyLoop = useBattleEngineStore((state) => state.setEnemyLoop);

	const playerPosXRef = useRef(playerPosX);
	const enemyPosXRef = useRef(enemyPosX);

	const getPlayerPosX = () => playerPosXRef.current;
	const getEnemyPosX = () => enemyPosXRef.current;

	const adjustZValues = (entity: 'enemy' | 'player') => {
		if (entity === 'enemy' && enemyZ <= playerZ) {
			setPlayerZ(0);
			setEnemyZ(1);
		} else if (entity === 'player' && playerZ <= enemyZ) {
			setPlayerZ(1);
			setEnemyZ(0);
		}
	};

	const setPlayerActionRef = useRef<(action: AnimationStateType) => void>(
		() => {}
	);
	const setEnemyActionRef = useRef<(action: AnimationStateType) => void>(
		() => {}
	);

	const customSceneActiveRef = useRef(false);
	const currentSceneNameRef = useRef<sceneName>('defaultBattleScence');
	const onCustomSceneAnimationCompleteRef =
		useRef<(sceneName?: sceneName) => void>(undefined);
	const onCustomScenceLastStepIndexRef =
		useRef<(sceneName?: sceneName) => void>(undefined);
	const cleanupRef = useRef<() => void | undefined>(undefined);

	const start = () => setStepIndex(0);

	const next = useCallback(() => {
		setStepIndex((prevIndex) => {
			const isLast = prevIndex + 1 >= currentSteps.length;

			if (isLast) {
				if (customSceneActive) {
					onCustomSceneAnimationCompleteRef.current?.(
						currentSceneNameRef.current
					);

					onCustomSceneAnimationCompleteRef.current = undefined;
					onCustomScenceLastStepIndexRef.current = undefined;
					currentSceneNameRef.current = 'defaultBattleScence';

					setCurrentSteps(loop ? defaultBattleScene : []);
					setCustomSceneActive(false);
				}

				return loop ? 0 : prevIndex + 1;
			}

			return prevIndex + 1;
		});
	}, [currentSteps, loop, customSceneActive]);

	const end = useCallback(() => {}, [customSceneActive]);

	const context: BattleContext = {
		next,
		end,
		setPlayerAction: (a) => setPlayerActionRef.current(a),
		setEnemyAction: (a) => setEnemyActionRef.current(a),
		setPlayerLoop,
		setEnemyLoop,
		setPlayerPosX,
		setEnemyPosX,
		getPlayerPosX,
		getEnemyPosX,
		adjustZValues,
	};

	const queueCustomScene: QueueCustomSceneFn = useCallback(
		({
			sceneSteps,
			sceneName,
			onComplete,
			onLastStepIndex,
		}: CustomSceneConfig) => {
			if (customSceneActiveRef.current) return;

			cleanupRef.current?.();
			currentSceneNameRef.current = sceneName ?? 'defaultBattleScence';
			onCustomSceneAnimationCompleteRef.current = onComplete;
			onCustomScenceLastStepIndexRef.current = onLastStepIndex;

			setCustomSceneActive(true);
			setCurrentSteps(sceneSteps);
			setStepIndex(0);
		},
		[]
	);

	// Run current step
	useEffect(() => {
		if (stepIndex < 0 || stepIndex >= currentSteps.length) return;

		cleanupRef.current?.();
		const stepFn = currentSteps[stepIndex];
		const cleanup = stepFn(context);
		cleanupRef.current = cleanup ?? undefined;
	}, [stepIndex, currentSteps]);

	useEffect(() => {
		playerPosXRef.current = playerPosX;
	}, [playerPosX]);

	useEffect(() => {
		enemyPosXRef.current = enemyPosX;
	}, [enemyPosX]);

	useEffect(() => {
		customSceneActiveRef.current = customSceneActive;
	}, [customSceneActive]);

	useEffect(() => {
		const isLast = stepIndex + 1 >= currentSteps.length;
		if (customSceneActive && isLast) {
			onCustomScenceLastStepIndexRef.current?.(
				currentSceneNameRef.current
			);
		}
	}, [stepIndex, customSceneActive]);

	// ✅ Final cleanup for unmount/reset
	const reset = useCallback(() => {
		cleanupRef.current?.();
		cleanupRef.current = undefined;
		setStepIndex(-1);
		setLoop(false);
		setCustomSceneActive(false);
		setCurrentSteps(scene);
		currentSceneNameRef.current = 'defaultBattleScence';
		customSceneActiveRef.current = false;
		onCustomSceneAnimationCompleteRef.current = undefined;
		onCustomScenceLastStepIndexRef.current = undefined;
	}, []);

	useEffect(() => {
		return () => {
			reset();
		};
	}, [reset]);

	return {
		customSceneActiveRef,
		setPlayerActionRef,
		playerPosX,
		playerZ,
		playerLoop,
		setEnemyActionRef,
		enemyPosX,
		enemyZ,
		enemyLoop,
		isLooping: loop,
		startBattle: start,
		queueCustomScene,
		setLoop,
		reset,
	};
};
