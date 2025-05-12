import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import useCharacterAnimation, {
	AnimationStateType,
} from '../../Battle/hooks/useCharacterAnimation';
import { useBattleEngine } from './useBattleEngine';
import { defaultBattleScene } from '../battleEngine/scenes/default/defaultBattleScene';
import { parsePlayerAvatar } from '../../../utils/parsePlayerAvatar';
import { Quest } from '../../Subjects/components/Pages/Quest/QuestsPage';
import { useBattleUI } from '../context/BattleUIContext';
import { sceneName } from '../battleEngine/scenes/sceneNames';
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
	const playerProfileAvatarUrl = 'worker/police.png';
	const { playerClass, playerSkin } = parsePlayerAvatar(
		playerProfileAvatarUrl
	);

	const [selectedQuests, setSelectedQuests] = useState<Quest[]>([]);
	const [completedQuestIds, setCompletedQuestIds] = useState<number[]>([]);

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

	// mock fetch of quests
	useEffect(() => {
		const mockFetch = async () => {
			// mimic network delay
			await new Promise((resolve) => setTimeout(resolve, 300));

			const mockResponse: Quest[] = [
				{
					id: 1,
					description: '[NEW] Study React Hooks',
					difficulty: 2,
					deadline: '',
				},
				{
					id: 2,
					description: '[NEW] Complete TypeScript Tutorial',
					difficulty: 2,
					deadline: '',
				},
				{
					id: 3,
					description: '[NEW] Practice CSS Grid',
					difficulty: 2,
					deadline: '',
				},
				{
					id: 4,
					description: '[NEW] Learn Redux',
					difficulty: 3,
					deadline: '',
				},
				{
					id: 5,
					description: '[NEW] Build a Portfolio Website',
					difficulty: 4,
					deadline: '',
				},
			];

			setSelectedQuests(mockResponse);
		};

		mockFetch();
	}, []);

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
		(questId: number) => {
			setCurrentEnemy((prevEnemy) => {
				const newEnemy = getRandomChoice(enemyTypes, prevEnemy);
				return newEnemy;
			});
			setCompletedQuestIds((prev) => {
				if (prev.length >= selectedQuests.length) return prev;
				return [...prev, questId];
			});
		},
		[selectedQuests]
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
		selectedQuests,
		completedQuestIds,
		handleQuestComplete,
	};

	return {
		arenaProps,
		questListProps,
		battleEngineProps,
		battleUIProviderProps,
	};
};
