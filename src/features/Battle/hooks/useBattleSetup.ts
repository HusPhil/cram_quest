import { useCallback, useEffect, useState } from 'react';
import useCharacterAnimation, {
	AnimationStateType,
} from '../../Battle/hooks/useCharacterAnimation';
import { useBattleEngine } from './useBattleEngine';
import { defaultBattleScene } from '../battleEngine/scenes/default/defaultBattleScene';
import { parsePlayerAvatar } from '../../../utils/parsePlayerAvatar';
import { CharacterType } from '../configs/spritesheetConfig';
import { useBattleEngineStore } from '../stores/battleEngineStore';
import { useUserPlayerStore } from '../../Auth/stores/userPlayerStore/userPlayerStore';

export const useBattleSetup = (isBossBattle: boolean = false) => {
	let enemyTypes: CharacterType[];

	if (isBossBattle) {
		enemyTypes = [
			'dark_knight',
			'evil_shogun',
			'orc_lord',
			'pig_lord',
			'skeleton_lord',
		] as CharacterType[];
	} else {
		enemyTypes = [
			'orc',
			'pig',
			'skeleton',
			'orc',
			'pig',
		] as CharacterType[];
	}

	// Character setup
	const playerProfileAvatarUrl = useUserPlayerStore(
		(state) => state.avatarUrl
	);
	const { playerClass, playerSkin } = parsePlayerAvatar(
		playerProfileAvatarUrl!
	);
	const [currentEnemy, setCurrentEnemy] = useState<CharacterType>(
		getRandomChoice(enemyTypes, 'orc', false)
	);

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
		setEnemyActionRef,
		setPlayerActionRef,
		setLoop,
		startBattle,
		queueCustomScene,
		customSceneActiveRef,
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
		setCurrentEnemy((prevEnemy) => {
			const newEnemy = getRandomChoice(enemyTypes, prevEnemy);
			return newEnemy;
		});
	}, []);

	useBattleEngineStore.setState({
		getNewEnemy: handleGetNewEnemy,
		setPlayerActionRef,
		setEnemyActionRef,
		getPlayerAnimation,
		getEnemyAnimation,
		queueCustomScene,
		isCustomSceneActive: customSceneActiveRef.current,
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
};
