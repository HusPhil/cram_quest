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

	const [selectedQuests, setSelectedQuests] = useState<Quest[]>([]);
	const [ completedQuests, setCompletedQuests ] = useState<number>(0)

	useEffect(() => {
		const mockFetch = async () => {
			// mimic network delay
			await new Promise(resolve => setTimeout(resolve, 300)); 
			
			const mockResponse: Quest[] = [
				{ id: 1, description: '[NEW] Study React Hooks', difficulty: 2, deadline: '' },
				{ id: 2, description: '[NEW] Complete TypeScript Tutorial', difficulty: 2, deadline: '' },
				{ id: 3, description: '[NEW] Practice CSS Grid', difficulty: 2, deadline: '' },
				{ id: 4, description: '[NEW] Learn Redux', difficulty: 3, deadline: '' },
				{ id: 5, description: '[NEW] Build a Portfolio Website', difficulty: 4, deadline: '' },
			];
	
			setSelectedQuests(mockResponse);
		};
	
		mockFetch();
	}, []);

	const [ currentEnemy, setCurrentEnemy ] = useState<CharacterType>('skeleton_lord')

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
		// Guard clause - only proceed if correct scene and not processing
		if (sceneName !== "killEnemyScene" || processingRef.current) {
			return;
		}
	
		// Start processing
		processingRef.current = true;
	
		// Update quest completion counter
		setCompletedQuests(prevCount => {
			const newCount = prevCount + 1;
			const isAllQuestsCompleted = newCount === selectedQuests.length;
	
			// Handle boss appearance
			if (isAllQuestsCompleted) {
				setCurrentEnemy('orc_lord');
				processingRef.current = false;
				return newCount;
			}
	
			// Update to next random enemy
			setCurrentEnemy(prevEnemy => {
				const newEnemy = getRandomChoice(enemyTypes, prevEnemy);
				console.log(`Enemy defeated: ${prevEnemy}, Next enemy: ${newEnemy}`);
				return newEnemy;
			});
	
			// Reset processing flag with slight delay
			setTimeout(() => {
				processingRef.current = false;
			}, 100);
	
			return newCount;
		});
	}, [selectedQuests.length, enemyTypes]);


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
        handleKillEnemySceneEnd,
		selectedQuests,
		completedQuests
    }


	return {
		arenaProps,
		questListProps,
		battleProps,
        uiProviderProps
	};
};
