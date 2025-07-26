import { useState } from 'react';
import { useBattleEngineStore } from '../stores/battleEngineStore';

import { playerAttackScene } from '../battleEngine/scenes/playerAttack/playerAttackScene';
import { playerAttackMissScene } from '../battleEngine/scenes/playerAttackMiss/playerMissScene';
import { enemyAttackScene } from '../battleEngine/scenes/enemyAttack/enemyAttackScene';
import { chainScenes } from '../utils/chainScenes';
import { playerDefendScene } from '../battleEngine/scenes/playerDefend/playerDefendScene';
import { playerDefendSuccessScene } from '../battleEngine/scenes/playerDefendSuccess/playerDefendSuccessScene';
import { playerDefendMissScene } from '../battleEngine/scenes/playerDefendMiss/playerDefendMissScene';
import { accuracyCalculator } from '../utils/accuracyCalculator';
import { toast } from 'react-toastify';

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
		setCurrentCursorWidth(10);
	};

	const handleDefendClick = () => {
		setActionPhase('defend');
		setCurrentSpeed(80);
		setCurrentHitTargetWidth(10);
		setCurrentCursorWidth(10);
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

		const isEnemyCrit = Math.random() < 0.15;
		const enemyAttackSuccess = true; // enemy will always successfully hit in this case
		const enemyAtkDamage = getEnemyAttackDamage(
			enemyAttackSuccess,
			isEnemyCrit
		);

		if (isEnemyCrit) {
			writeToBattleLog(
				playerAtkDamage.toString() + '::' + enemyAtkDamage.toString(),
				isEnemyCrit ? 'fail' : 'default'
			);
		} else {
			writeToBattleLog(
				playerAtkDamage.toString() + '::' + enemyAtkDamage.toString(),
				isCriticalHit ? 'success' : 'default'
			);
		}

		handlePlayerAttack(playerAtkDamage);
		handleEnemyAttack(enemyAtkDamage, 0);

		setTimeout(() => setActionPhase(null), 1000);
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

		writeToBattleLog(
			enemyAtkDamage.toString(),
			isPerfectDefense ? 'success' : 'default'
		);

		handleEnemyAttack(enemyAtkDamage, 0);

		setTimeout(() => setActionPhase(null), 1000);
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
