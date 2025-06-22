import { useCallback, useEffect, useRef, useState } from 'react';
import { BattleContext, BattleStepFn } from '../battleEngine/types';
import { AnimationStateType } from './useCharacterAnimation';
import { defaultBattleScene } from '../battleEngine/scenes/default/defaultBattleScene';
import { sceneName } from '../battleEngine/scenes/sceneNames';
import { useBattleEngineStore } from '../../Subjects/stores/battleEngineStore';

export type QueueCustomSceneFn = (
	sceneSteps: BattleStepFn[],
	sceneName?: sceneName,
	onComplete?: (sceneName?: sceneName) => void,
	onLastStepIndex?: (sceneName?: sceneName) => void
) => void;

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

	// Start battle
	const start = () => setStepIndex(0);
	const next = useCallback(() => {
		setStepIndex((prevIndex) => {
			const isLast = prevIndex + 1 >= currentSteps.length;

			if (isLast) {
				setCustomSceneActive(false);

				return loop ? 0 : prevIndex + 1;
			}

			return prevIndex + 1;
		});
	}, [stepIndex]);
	const end = useCallback(() => {
		if (currentSceneNameRef.current === 'killEnemyScene') {
			onCustomSceneAnimationCompleteRef.current?.(
				currentSceneNameRef.current
			);
			currentSceneNameRef.current = 'defaultBattleScence';
			setCurrentSteps(defaultBattleScene);
		}
	}, []);

	// === Provide current context to steps ===
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
		(
			sceneSteps: BattleStepFn[],
			sceneName?: sceneName,
			onAnimationComplete?: (sceneName?: sceneName) => void,
			onLastStepIndex?: (sceneName?: sceneName) => void
		) => {
			if (customSceneActiveRef.current) return;

			cleanupRef.current?.();
			currentSceneNameRef.current = sceneName ?? 'defaultBattleScence';
			onCustomSceneAnimationCompleteRef.current = onAnimationComplete;
			onCustomScenceLastStepIndexRef.current = onLastStepIndex;

			setCustomSceneActive(true);
			setCurrentSteps(sceneSteps);
			setStepIndex(0);
		},
		[]
	);

	// === Run current step ===
	useEffect(() => {
		if (stepIndex < 0 || stepIndex >= currentSteps.length) return;
		cleanupRef.current?.();

		const stepFn = currentSteps[stepIndex];
		const cleanup = stepFn(context);
		cleanupRef.current = cleanup ?? undefined;
	}, [stepIndex, currentSteps]);

	// update the player positionRef
	useEffect(() => {
		playerPosXRef.current = playerPosX;
	}, [playerPosX]);

	// update the enemy positionRef
	useEffect(() => {
		enemyPosXRef.current = enemyPosX;
	}, [enemyPosX]);

	// to track if there are still an custom scene that is active
	useEffect(() => {
		customSceneActiveRef.current = customSceneActive;
		if (!customSceneActive) {
		}
	}, [customSceneActive]);

	// called for when the animation enters the last step index (not the animation end)
	useEffect(() => {
		const isLast = stepIndex + 1 >= currentSteps.length;
		if (currentSceneNameRef.current === 'killEnemyScene' && isLast) {
			onCustomScenceLastStepIndexRef.current?.(
				currentSceneNameRef.current
			);
		}
	}, [stepIndex]);

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
	};
};
