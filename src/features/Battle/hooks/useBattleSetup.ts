import { useCallback, useEffect, useState } from 'react';
import useCharacterAnimation, {
	AnimationStateType,
} from '../../Battle/hooks/useCharacterAnimation';
import { useBattleEngine } from './useBattleEngine';
import { defaultBattleScene } from '../battleEngine/scenes/default/defaultBattleScene';
import { parsePlayerAvatar } from '../../../utils/parsePlayerAvatar';
import { CharacterType } from '../configs/spritesheetConfig';
import { toast } from 'react-toastify';
import { useBattleEngineStore } from '../../Subjects/stores/battleEngineStore';

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

	const handleGetNewEnemy = useCallback(() => {
		toast.info('Gawa na ng bagong enemy dine!');

		setCurrentEnemy((prevEnemy) => {
			const newEnemy = getRandomChoice(enemyTypes, prevEnemy);
			return newEnemy;
		});
	}, []);

	useBattleEngineStore.setState({
		setPlayerActionRef: setPlayerActionRef,
		setEnemyActionRef: setEnemyActionRef,
		getPlayerAnimation,
		getEnemyAnimation,
		getNewEnemy: handleGetNewEnemy,
	});

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

	// Organize props for components
	const arenaProps = {
		playerZ,
		playerLoop,
		playerPosX,
		getPlayerAnimation,

		enemyZ,
		enemyLoop,
		enemyPosX,
		getEnemyAnimation,
	};

	const questListProps = {
		queueCustomScene,
		customSceneActive: !!customSceneActiveRef.current,
	};

	const battleEngineProps = {
		customSceneActiveRef,
		queueCustomScene,
		startBattle,
	};

	const battleUIProviderProps = {
		handleGetNewEnemy,
	};

	return {
		arenaProps,
		battleEngineProps,
		battleUIProviderProps,
	};
};
