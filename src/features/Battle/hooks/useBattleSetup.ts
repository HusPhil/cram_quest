import { ChangeEvent, useCallback, useEffect } from 'react';
import useCharacterAnimation, {
	AnimationStateType,
} from '../../Battle/hooks/useCharacterAnimation';
import { useBattleEngine } from './useBattleEngine';
import { defaultBattleSequence } from '../../Battle/battleEngine/scenes/default/defaultSequence';
import { parsePlayerAvatar } from '../../Battle/utils/parsePlayerAvatar';
import { Quest } from '../../Subjects/components/Pages/Quest/QuestsPage';
import { useBattleUI } from '../context/BattleUIContext';

export const useBattleSetup = () => {
	// Character setup
	const playerProfileAvatarUrl = 'default/default_1.png';
	const { playerClass, playerSkin } = parsePlayerAvatar(
		playerProfileAvatarUrl
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
	} = useCharacterAnimation('skeleton');

	// Battle engine
	const {
		startBattle,
		enemyPosX,
		enemyLoop,
		enemyZ,
		playerPosX,
		playerLoop,
		playerZ,
		setEnemyActionRef,
		setPlayerActionRef,
		queueCustomScene,
		customSceneActiveRef,
		setLoop,
	} = useBattleEngine(defaultBattleSequence);

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


    const handleCheckboxChangeOnParent = useCallback((e: ChangeEvent<HTMLInputElement>, quest: Quest) => {
		console.log("HANDLED IN PARENT", e.type, ": ", quest.description);
	}, [])


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
		customSceneActiveRef,
	};

	const questListProps = {
		queueCustomScene,
		customSceneActive: !!customSceneActiveRef.current,
        onCheckboxChangeOnParent: handleCheckboxChangeOnParent
	};

	const battleProps = {
		queueCustomScene,
        customSceneActiveRef,
		startBattle,
	};



	return {
		arenaProps,
		questListProps,
		battleProps,
	};
};
