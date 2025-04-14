import { placeEnemyMiddle } from './placeEnemyMiddle';
import { playerSwordAttack2 } from '../../animationSteps/playerSwordAttack2';
import { playerSwordCharge } from '../default/playerSwordCharge';
import { playerPunch } from '../../animationSteps/playerPunch';
import { BattleStepFn } from '../../types';
import { playerPunchCharge } from './playerPunchCharge';
import { enemyHurt } from '../../animationSteps/enemyHurt';

export const killEnemySequence: BattleStepFn[] = [
	placeEnemyMiddle,
	playerPunchCharge,
    playerPunch,
	enemyHurt,
	playerSwordCharge
];
