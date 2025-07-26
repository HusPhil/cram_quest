import { enemyHurtWeak } from '../../animationSteps/enemyHurtWeak';
import { playerSwordAttack1 } from '../../animationSteps/playerSwordAttack1';
import { playerSwordAttack2 } from '../../animationSteps/playerSwordAttack2';
import { BattleStepFn } from '../../types';
import { playerSwordCharge } from '../default/playerSwordCharge';
import { walkToMiddle } from '../../animationSteps/walkToMiddle';
import { placeEnemyMiddle } from '../killEnemy/placeEnemyMiddle';
import { playerAttackSceneEnd } from './playerAttackSceneEnd';

export const playerAttackScene: BattleStepFn[] = [
	walkToMiddle,
	playerSwordCharge,
	playerSwordAttack1,
	enemyHurtWeak,
	playerAttackSceneEnd,
];
