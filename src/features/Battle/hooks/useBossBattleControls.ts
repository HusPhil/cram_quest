import { useState } from 'react';
import { useBattleEngineStore } from '../stores/battleEngineStore';

import { playerAttackScene } from '../battleEngine/scenes/playerAttack/playerAttackScene';
import { playerAttackMissScene } from '../battleEngine/scenes/playerAttackMiss/playerMissScene';
import { enemyAttackScene } from '../battleEngine/scenes/enemyAttack/enemyAttackScene';
import { chainScenes } from '../utils/chainScenes';
import { playerDefendScene } from '../battleEngine/scenes/playerDefend/playerDefendScene';
import { playerDefendSuccessScene } from '../battleEngine/scenes/playerDefendSuccess/playerDefendSuccessScene';
import { playerDefendMissScene } from '../battleEngine/scenes/playerDefendMiss/playerDefendMissScene';

type UseBossBattleControlsProps = {
	addToBattleLog: (
		message: string,
		variant?: 'success' | 'fail' | 'default' | 'info'
	) => void;
	handlePlayerAttack: (damage: number) => void;
	handleEnemyAttack: (damage: number, block: number) => void;
};

export function useBossBattleControls({
	addToBattleLog,
	handlePlayerAttack,
	handleEnemyAttack,
}: UseBossBattleControlsProps) {
	const [actionPhase, setActionPhase] = useState<'attack' | 'defend' | null>(
		null
	);
	const [currentSpeed, setCurrentSpeed] = useState(100);
	const [currentHitTargetWidth, setCurrentHitTargetWidth] = useState(40);
	const [currentCursorWidth, setCurrentCursorWidth] = useState(32);
	const [accuracyMessage, setAccuracyMessage] = useState<string | null>(null);

	const queueCustomScene = useBattleEngineStore((s) => s.queueCustomScene);

	const handleAttackClick = () => {
		setActionPhase('attack');
		setCurrentSpeed(150);
		setCurrentHitTargetWidth(30);
		setCurrentCursorWidth(10);
		setAccuracyMessage(null);
	};

	const handleDefendClick = () => {
		setActionPhase('defend');
		setCurrentSpeed(80);
		setCurrentHitTargetWidth(30);
		setCurrentCursorWidth(10);
		setAccuracyMessage(null);
	};

	const handleEnemyAttackSceneEnd = (damage: number) => {
		handleEnemyAttack(damage, 0);
		setActionPhase(null);
	};

	const handleTimingBarStop = (isHit: boolean, finalPosition: number) => {
		if (!actionPhase) return;

		const center =
			(100 - currentHitTargetWidth) / 2 + currentHitTargetWidth / 2;
		const accuracy = Math.abs(finalPosition - center);
		let damage = 0;

		if (actionPhase === 'attack') {
			damage = Math.max(1, Math.round(5 + (1 - accuracy / 30) * 10));
			const message = isHit
				? `Hit! You dealt ${damage}`
				: `Miss! You dealt ${damage}`;

			chainScenes(queueCustomScene, [
				{
					sceneSteps: isHit
						? playerAttackScene
						: playerAttackMissScene,
					sceneName: isHit
						? 'playerAttackScene'
						: 'playerAttackMissScene',
					onLastStepIndex: () => {
						addToBattleLog(
							isHit ? 'You dealt damage!' : 'You missed!',
							isHit ? 'success' : 'fail'
						);
						handlePlayerAttack(damage);
					},
				},
				{
					sceneSteps: enemyAttackScene,
					sceneName: 'enemyAttackScene',
					onLastStepIndex: () => handleEnemyAttackSceneEnd(damage),
				},
			]);

			setAccuracyMessage(message);
		}

		if (actionPhase === 'defend') {
			damage = Math.max(1, Math.round(20 + (1 - accuracy / 50) * 10));
			const message = isHit
				? `Defended! You blocked ${damage}`
				: `Defend failed!`;

			chainScenes(queueCustomScene, [
				{
					sceneSteps: playerDefendScene,
					sceneName: 'playerDefendScene',
					onLastStepIndex: () => {
						addToBattleLog(
							isHit ? 'You defended!' : 'You failed to defend!',
							isHit ? 'success' : 'fail'
						);
						handlePlayerAttack(damage);
					},
				},
				{
					sceneSteps: isHit
						? playerDefendSuccessScene
						: playerDefendMissScene,
					sceneName: isHit
						? 'playerDefendSuccessScene'
						: 'playerDefendMissScene',
					onComplete: () => setActionPhase(null),
				},
			]);

			setAccuracyMessage(message);
		}
	};

	return {
		actionPhase,
		accuracyMessage,
		currentSpeed,
		currentHitTargetWidth,
		currentCursorWidth,
		handleAttackClick,
		handleDefendClick,
		handleTimingBarStop,
	};
}
