import { placeEnemyMiddle } from '../animationSteps/placeEnemyMiddle';
import { playerCharge } from '../animationSteps/playerCharge';
import { playerPunch } from '../animationSteps/playerPunch';
import { BattleStepFn } from '../types';

export const killEnemySequence: BattleStepFn[] = [
	placeEnemyMiddle,
	playerCharge,
    playerPunch
];
