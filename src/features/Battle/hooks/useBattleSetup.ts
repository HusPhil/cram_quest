import { useCallback, useEffect, useState } from 'react';
import useCharacterAnimation, {
	AnimationStateType,
} from '../../Battle/hooks/useCharacterAnimation';
import { useBattleEngine } from './useBattleEngine';
import { parsePlayerAvatar } from '../../../utils/parsePlayerAvatar';
import { CharacterType, PlayerSkin } from '../configs/spritesheetConfig';
import { useBattleEngineStore } from '../stores/battleEngineStore';
import { useUserPlayerStore } from '../../Auth/stores/userPlayerStore/userPlayerStore';
import { BattleStepFn } from '../battleEngine/types';
import { useBattleSetupStore } from '../stores/battleSetupStore';
import { getRandomChoice } from '../../../utils/getRandomChoice';

export const useBattleSetup = (
	isBossBattle: boolean = false,
	initialSceneSteps: BattleStepFn[] = [],
	isLoopOn: boolean = false
) => {
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
		(state) => state.skinUrl || state.avatarUrl
	);
	const { playerClass, playerSkin } = parsePlayerAvatar(
		playerProfileAvatarUrl!
	);
	const [currentEnemy, setCurrentEnemy] = useState<CharacterType>(
		getRandomChoice(enemyTypes, 'orc')
	);

	// Player animation
	const {
		getAnimationParams: getPlayerAnimation,
		setCurrentAction: setPlayerCurrentAction,
	} = useCharacterAnimation('player', playerClass, playerSkin as PlayerSkin);

	// Enemy animation
	const {
		getAnimationParams: getEnemyAnimation,
		setCurrentAction: setEnemyCurrentAction,
	} = useCharacterAnimation(currentEnemy as CharacterType);

	// Battle engine
	const {
		setEnemyActionRef,
		setPlayerActionRef,
		setLoop,
		startBattle,
		queueCustomScene,
		customSceneActiveRef,
	} = useBattleEngine(initialSceneSteps);

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

		const setEnemyName = useBattleSetupStore.getState().setEnemyName;
		setEnemyName(currentEnemy.replace(/_/g, ' '));

		// Initialize and start
		setLoop(isLoopOn);
		startBattle();

		setPlayerCurrentAction('idle');
		setEnemyCurrentAction('idle');
	}, []);
};
