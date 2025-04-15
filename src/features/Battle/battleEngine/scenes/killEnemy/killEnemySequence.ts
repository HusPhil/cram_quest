import { placeEnemyMiddle } from './placeEnemyMiddle';
import { playerSwordAttack2 } from '../../animationSteps/playerSwordAttack2';
import { playerPunch } from '../../animationSteps/playerPunch';
import { BattleStepFn } from '../../types';
import { playerPunchCharge } from './playerPunchCharge';
import { enemyHurtWeak } from '../../animationSteps/enemyHurtWeak';
import { playerSwordAttack1 } from '../../animationSteps/playerSwordAttack1';
import { enemyDeath } from '../../animationSteps/enemyDeath';
import { playerExit } from '../../animationSteps/playerExit';

export const killEnemySequence: BattleStepFn[] = [
	placeEnemyMiddle,
	playerPunchCharge,
    playerPunch,
	enemyHurtWeak,
	playerSwordAttack2,
	playerSwordAttack1,
	enemyDeath,
	playerExit,
];
