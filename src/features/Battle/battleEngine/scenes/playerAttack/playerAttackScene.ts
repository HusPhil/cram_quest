import { enemyHurtWeak } from '../../animationSteps/enemyHurtWeak';
import { playerSwordAttack1 } from '../../animationSteps/playerSwordAttack1';
import { BattleStepFn } from '../../types';
import { playerSwordCharge } from '../default/playerSwordCharge';
import { walkToMiddle } from '../../animationSteps/walkToMiddle';
import { playerAttackSceneEnd } from './playerAttackSceneEnd';

export const playerAttackScene: BattleStepFn[] = [
	walkToMiddle,
	playerSwordCharge,
	playerSwordAttack1,
	enemyHurtWeak,
	playerAttackSceneEnd,
];
