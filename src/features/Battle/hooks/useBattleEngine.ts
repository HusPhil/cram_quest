import { useCallback, useEffect, useRef, useState } from 'react';
import { BattleContext, BattleStepFn } from '../battleEngine/types';
import { AnimationStateType } from './useCharacterAnimation';
import { defaultBattleScene } from '../battleEngine/scenes/default/defaultBattleScene';
import { sceneName } from '../battleEngine/scenes/sceneNames';

export const useBattleEngine = (scene: BattleStepFn[]) => {
	const [stepIndex, setStepIndex] = useState(-1);
	const [loop, setLoop] = useState(false);
	const [currentSteps, setCurrentSteps] = useState<BattleStepFn[]>(scene);
	const [customSceneActive, setCustomSceneActive] = useState(false);

	const [playerPosX, setPlayerPosX] = useState(0);
	const [enemyPosX, setEnemyPosX] = useState(48 * 3);

	const [playerLoop, setPlayerLoop] = useState(true);
	const [enemyLoop, setEnemyLoop] = useState(true);

	const [playerZ, setPlayerZ] = useState(99);
	const [enemyZ, setEnemyZ] = useState(100);

	const customSceneActiveRef = useRef(false);
	const setPlayerActionRef = useRef<(action: AnimationStateType) => void>(
		() => {}
	);
	const setEnemyActionRef = useRef<(action: AnimationStateType) => void>(
		() => {}
	);

	const currentSceneNameRef = useRef<sceneName | undefined>(undefined);
	const onSceneCompleteRef = useRef<(sceneName?: sceneName) => void>(undefined);

	const cleanupRef = useRef<() => void | undefined>(undefined);

	const playerPosXRef = useRef(playerPosX);
	const enemyPosXRef = useRef(enemyPosX);

	const getPlayerPosX = () => playerPosXRef.current;
	const getEnemyPosX = () => enemyPosXRef.current;

	const adjustZValues = (entity: 'enemy' | 'player') => {
		if (entity === 'enemy' && enemyZ <= playerZ) {
			setPlayerZ((p) => p - 10);
			setEnemyZ((e) => e + 10);
		} else if (entity === 'player' && playerZ <= enemyZ) {
			setPlayerZ((p) => p + 10);
			setEnemyZ((e) => e - 10);
		}
	};

	const next = () => {
		setStepIndex((prevIndex) => {
			const isLast = prevIndex + 1 >= currentSteps.length;

			if (isLast) {
				if (customSceneActive) {
					// Return to default steps after scene)
					onSceneCompleteRef.current?.(currentSceneNameRef.current);

					setCustomSceneActive(false);
					setCurrentSteps(defaultBattleScene);
					return 0;
				}
				return loop ? 0 : prevIndex + 1;
			}

			return prevIndex + 1;
		});
	};

	const queueCustomScene = useCallback(
		(
			sceneSteps: BattleStepFn[],
			sceneName?: sceneName,
			onComplete?: (sceneName?: sceneName) => void
		) => {
			if (customSceneActiveRef.current) return;

			cleanupRef.current?.();
			currentSceneNameRef.current = sceneName;
			onSceneCompleteRef.current = onComplete;

			setCustomSceneActive(true);
			setCurrentSteps(sceneSteps);
			setStepIndex(0);
		},
		[]
	);

	// Start battle
	const start = () => setStepIndex(0);

	// === Provide current context to steps ===
	const context: BattleContext = {
		next,
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

	// === Run current step ===
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

	return {
		startBattle: start,
		playerPosX,
		enemyPosX,
		playerLoop,
		enemyLoop,
		playerZ,
		enemyZ,
		setPlayerActionRef,
		setEnemyActionRef,
		queueCustomScene,
		customSceneActiveRef,
		setLoop,
		isLooping: loop,
	};
};
