import { useState } from 'react';
import { useBattleEngineStore } from '../stores/battleEngineStore';

import { playerAttackScene } from '../battleEngine/scenes/playerAttack/playerAttackScene';
import { chainScenes } from '../utils/chainScenes';
import { toast } from 'react-toastify';
import { accuracyCalculator } from '../utils/accuracyCalculator';
import { playerAttackMissScene } from '../battleEngine/scenes/playerAttackMiss/playerMissScene';
import { enemyAttackScene } from '../battleEngine/scenes/enemyAttack/enemyAttackScene';
import { playerDefendSuccessScene } from '../battleEngine/scenes/playerDefendSuccess/playerDefendSuccessScene';
import { playerDefendMissScene } from '../battleEngine/scenes/playerDefendMiss/playerDefendMissScene';
import { playerDefendScene } from '../battleEngine/scenes/playerDefend/playerDefendScene';

type UseBossBattleControlsProps = {
	incrementTurnCount: () => void;
	writeToBattleLog: (
		message: string,
		variant?: 'success' | 'fail' | 'default' | 'info'
	) => void;
	handlePlayerAttack: (damage: number) => void;
	handleEnemyAttack: (damage: number, block: number) => void;
};

export function useBossBattleControls({
	incrementTurnCount,
	writeToBattleLog,
	handlePlayerAttack,
	handleEnemyAttack,
}: UseBossBattleControlsProps) {
	const [actionPhase, setActionPhase] = useState<'attack' | 'defend' | null>(
		null
	);
	const [currentSpeed, setCurrentSpeed] = useState(100);
	const [currentHitTargetWidth, setCurrentHitTargetWidth] = useState(40);
	const [currentCursorWidth, setCurrentCursorWidth] = useState(32);

	const queueCustomScene = useBattleEngineStore((s) => s.queueCustomScene);

	const handleAttackClick = () => {
		setActionPhase('attack');
		setCurrentSpeed(150);
		setCurrentHitTargetWidth(3);
		setCurrentCursorWidth(5);
	};

	const handleDefendClick = () => {
		setActionPhase('defend');
		setCurrentSpeed(80);
		setCurrentHitTargetWidth(10);
		setCurrentCursorWidth(5);
	};

	const getPlayerAttackDamage = (
		success: boolean,
		isCriticalHit: boolean,
		accuracyPercentage: number
	) => {
		let damage = isCriticalHit ? 10 : 0;
		let baseDamageRoll = 0;
		let maxBase = 0;
		let minBase = 0;
		const accuracyBonus = accuracyPercentage / 10;

		if (success) {
			toast('success');
			maxBase = 12;
			minBase = 8;
			baseDamageRoll =
				Math.floor(Math.random() * (maxBase - minBase + 1)) + minBase;
		} else {
			maxBase = 7;
			minBase = 5;
			baseDamageRoll =
				Math.floor(Math.random() * (maxBase - minBase + 1)) + minBase;
		}

		damage += Math.round(baseDamageRoll + accuracyBonus);

		return damage;
	};

	const getEnemyAttackDamage = (
		success: boolean,
		isCriticalHit: boolean,
		defenseReductionPercentage: number = 0
	) => {
		let damage = 0;
		let maxBase = 17;
		let minBase = 15;
		const baseDamageRoll =
			Math.floor(Math.random() * (maxBase - minBase + 1)) + minBase;

		if (success) {
			damage += baseDamageRoll;
		} else {
			const reducedDamage =
				baseDamageRoll * (1 - (defenseReductionPercentage - 10) / 100);
			damage += Math.max(reducedDamage, 2);
		}

		if (isCriticalHit) {
			damage *= 1.5;
		}

		return Math.floor(damage);
	};

	const handleAttackPhase = (success: boolean, finalPosition: number) => {
		const accuracyPercentage = accuracyCalculator(finalPosition);
		const isCriticalHit = accuracyPercentage === 100;

		const playerAtkDamage = getPlayerAttackDamage(
			success,
			isCriticalHit,
			accuracyPercentage
		);

		const isEnemyCrit = Math.random() < 0.25;
		const enemyAttackSuccess = true; // enemy will always successfully hit in this case
		const enemyAtkDamage = getEnemyAttackDamage(
			enemyAttackSuccess,
			isEnemyCrit
		);

		chainScenes(
			queueCustomScene,
			[
				{
					sceneSteps: success
						? playerAttackScene
						: playerAttackMissScene,
					sceneName: success
						? 'playerAttackScene'
						: 'playerAttackMissScene',
					onLastStepIndex: success
						? () => {
								handlePlayerAttack(playerAtkDamage);
								writeToBattleLog(
									isCriticalHit ? 'Critical hit' : 'Nice hit',
									isCriticalHit ? 'success' : 'info'
								);
						  }
						: () => {
								writeToBattleLog('You missed', 'fail');
						  },
				},
				{
					sceneSteps: enemyAttackScene,
					sceneName: 'enemyAttackScene',
					onLastStepIndex: () => {
						handleEnemyAttack(enemyAtkDamage, 0);
						writeToBattleLog(
							isEnemyCrit ? 'Heavy damage' : '',
							'fail'
						);
					},
				},
			],
			() => {
				setActionPhase(null);
				incrementTurnCount();
			}
		);
	};

	const handleDefendPhase = (success: boolean, finalPosition: number) => {
		const accuracyPercentage = accuracyCalculator(finalPosition);
		const isPerfectDefense = accuracyPercentage === 100;
		const isEnemyCrit = Math.random() < 0.25;

		let enemyAtkDamage = getEnemyAttackDamage(
			!success,
			isEnemyCrit,
			accuracyPercentage
		);

		enemyAtkDamage = isPerfectDefense ? 1 : enemyAtkDamage;

		chainScenes(
			queueCustomScene,
			[
				{
					sceneSteps: playerDefendScene,
					sceneName: 'playerDefendScene',
					onLastStepIndex: success
						? () =>
								writeToBattleLog(
									isPerfectDefense ? 'Perfect' : 'Nice moves',
									isPerfectDefense ? 'success' : 'info'
								)
						: () => writeToBattleLog('Defense failed', 'fail'),
				},
				{
					sceneSteps: success
						? playerDefendSuccessScene
						: playerDefendMissScene,
					sceneName: success
						? 'playerDefendSuccessScene'
						: 'playerDefendMissScene',
					onLastStepIndex: () => {
						handleEnemyAttack(enemyAtkDamage, 0);
						writeToBattleLog(
							isEnemyCrit ? 'Heavy damage' : '',
							'fail'
						);
					},
				},
			],
			() => {
				setActionPhase(null);
				incrementTurnCount();
			}
		);
	};

	const handleTimingBarStop = (isHit: boolean, finalPosition: number) => {
		if (!actionPhase) return;

		if (actionPhase === 'attack') {
			handleAttackPhase(isHit, finalPosition);
		}

		if (actionPhase === 'defend') {
			handleDefendPhase(isHit, finalPosition);
		}
	};

	return {
		actionPhase,
		currentSpeed,
		currentHitTargetWidth,
		currentCursorWidth,
		handleAttackClick,
		handleDefendClick,
		handleTimingBarStop,
	};
}
