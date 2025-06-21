import { useCallback, useEffect, useState } from 'react';
import useCharacterAnimation, {
	AnimationStateType,
} from '../../Battle/hooks/useCharacterAnimation';
import { useBattleEngine } from './useBattleEngine';
import { defaultBattleScene } from '../battleEngine/scenes/default/defaultBattleScene';
import { parsePlayerAvatar } from '../../../utils/parsePlayerAvatar';
import { CharacterType } from '../configs/spritesheetConfig';

export const useBattleSetup = () => {
	const enemyTypes = [
		'orc',
		'pig',
		'skeleton',
		'orc',
		'pig',
	] as CharacterType[];

	// Character setup
	const playerProfileAvatarUrl = 'worker/prince.png';
	const { playerClass, playerSkin } = parsePlayerAvatar(
		playerProfileAvatarUrl
	);

	const [currentEnemy, setCurrentEnemy] =
		useState<CharacterType>('dark_knight');

	// Player animation
	const {
		getAnimationParams: getPlayerAnimation,
		setCurrentAction: setPlayerCurrentAction,
	} = useCharacterAnimation('player', playerClass, playerSkin);

	// Enemy animation
	const {
		getAnimationParams: getEnemyAnimation,
		setCurrentAction: setEnemyCurrentAction,
	} = useCharacterAnimation(currentEnemy);

	// Battle engine
	const {
		enemyPosX,
		enemyLoop,
		enemyZ,
		playerPosX,
		playerLoop,
		playerZ,
		setEnemyActionRef,
		setPlayerActionRef,
		customSceneActiveRef,
		queueCustomScene,
		setLoop,
		startBattle,
	} = useBattleEngine(defaultBattleScene);


	// Initialize battle
	useEffect(() => {
		// Connect action refs
		setPlayerActionRef.current = (action: AnimationStateType) =>
			setPlayerCurrentAction(action);
		setEnemyActionRef.current = (action: AnimationStateType) =>
			setEnemyCurrentAction(action);

		// Initialize and start
		setLoop(true);
		startBattle();
	}, []);

	function getRandomChoice<T>(
		choices: T[],
		currentChoice: T,
		excludeCurrent: boolean = true
	): T {
		const pool = excludeCurrent
			? choices.filter((choice) => choice !== currentChoice)
			: choices;

		if (pool.length === 0) return currentChoice;

		const randomIndex = Math.floor(Math.random() * pool.length);
		return pool[randomIndex];
	}

	const handleQuestComplete = useCallback(
		(task: string) => {
			setCurrentEnemy((prevEnemy) => {
				const newEnemy = getRandomChoice(enemyTypes, prevEnemy);
				return newEnemy;
			});
		},
		[]
	);

	// Organize props for components
	const arenaProps = {
		playerZ,
		playerLoop,
		playerPosX,
		enemyZ,
		enemyLoop,
		enemyPosX,
		getPlayerAnimation,
		getEnemyAnimation,
	};

	const questListProps = {
		queueCustomScene,
		customSceneActive: !!customSceneActiveRef.current,
	};

	const battleEngineProps = {
		queueCustomScene,
		customSceneActiveRef,
		startBattle,
	};

	const battleUIProviderProps = {
		handleQuestComplete,
	};

	return {
		arenaProps,
		questListProps,
		battleEngineProps,
		battleUIProviderProps,
	};
};
