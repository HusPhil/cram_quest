import { useEffect, useState } from 'react';
import { AnimationStateType } from './useCharacterAnimation';

export const useBattleAnimation = (
	setPlayerCurrentAction: (currentAction: AnimationStateType) => void,
	setEnemyCurrentAction: (currentAction: AnimationStateType) => void
) => {
	const [enemyPosX, setEnemyPosX] = useState(6);
	const [playerPosX, setPlayerPosX] = useState(0);

	const [playerAnimationLoop, setPlayerAnimationLoop] = useState(true);
	const [enemyAnimationLoop, setEnemyAnimationLoop] = useState(true);

	const [sceneStep, setSceneStep] = useState(0);


	return {
		sceneStep,
		enemyPosX,
		playerPosX,
		playerAnimationLoop,
		enemyAnimationLoop,
	};
};
