import { placeEnemyMiddle } from './placeEnemyMiddle';
import { playerSwordAttack2 } from '../../animationSteps/playerSwordAttack2';
import { playerSwordCharge } from '../default/playerSwordCharge';
import { playerPunch } from '../../animationSteps/playerPunch';
import { BattleStepFn } from '../../types';
import { playerPunchCharge } from './playerPunchCharge';
import { enemyHurt } from '../../animationSteps/enemyHurt';
import { enemyHurtWeak } from '../../animationSteps/enemyHurtWeak';
import { playerSwordAttack1 } from '../../animationSteps/playerSwordAttack1';
import { walkToMiddle } from '../default/walkToMiddle';
import { enemyAttack } from '../../animationSteps/enemyAttack';
import { playerHurt } from '../../animationSteps/playerHurt';

export const killEnemySequence: BattleStepFn[] = [
	walkToMiddle,
	enemyAttack,
	playerHurt,
	placeEnemyMiddle,
	playerPunchCharge,
    playerPunch,
	enemyHurtWeak,
	playerSwordAttack2,
	playerSwordAttack1,
	enemyHurtWeak
];
