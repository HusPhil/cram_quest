import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import useCharacterAnimation, {
	AnimationStateType,
} from '../../Battle/hooks/useCharacterAnimation';
import { useBattleEngine } from './useBattleEngine';
import { defaultBattleScene } from '../battleEngine/scenes/default/defaultBattleScene';
import { parsePlayerAvatar } from '../../Battle/utils/parsePlayerAvatar';
import { Quest } from '../../Subjects/components/Pages/Quest/QuestsPage';
import { useBattleUI } from '../context/BattleUIContext';
import { sceneName } from '../battleEngine/scenes/sceneNames';
import { CharacterType } from '../configs/spritesheetConfig';

export const useBattleSetup = () => {
		const enemyTypes = ['orc', 'pig', 'skeleton'] as CharacterType[]

	// Character setup
	const playerProfileAvatarUrl = 'default/default_1.png';
	const { playerClass, playerSkin } = parsePlayerAvatar(
		playerProfileAvatarUrl
	);

	const [ currentEnemy, setCurrentEnemy ] = useState<CharacterType>(getRandomChoice(enemyTypes, 'orc'))

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


    const handleCheckboxChangeOnParent = useCallback((e: ChangeEvent<HTMLInputElement>, quest: Quest) => {
		console.log("HANDLED IN PARENT", e.type, ": ", quest.description);
	}, [])

	function getRandomChoice<T>(choices: T[], currentChoice: T, excludeCurrent: boolean = true): T {
		const pool = excludeCurrent
		  ? choices.filter(choice => choice !== currentChoice)
		  : choices;
	  
		if (pool.length === 0) return currentChoice;
	  
		const randomIndex = Math.floor(Math.random() * pool.length);
		return pool[randomIndex];
	  }
	  
	  
	  

	const processingRef = useRef(false); //development only

	const handleKillEnemySceneEnd = useCallback((sceneName?: sceneName) => {
	if (sceneName === "killEnemyScene" && !processingRef.current) {
		processingRef.current = true;
		
		setCurrentEnemy(prevEnemy => {
			const newEnemy = getRandomChoice(enemyTypes, prevEnemy);
			console.log("Kill enemy scene completed: " + prevEnemy);
		
		// Reset flag after state update //development only
		setTimeout(() => {
			processingRef.current = false;
		}, 0);
		
		return newEnemy;
		});
	}
	}, []);


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

    const uiProviderProps = {
        handleKillEnemySceneEnd
    }



	return {
		arenaProps,
		questListProps,
		battleProps,
        uiProviderProps
	};
};
