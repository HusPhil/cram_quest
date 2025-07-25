import { playerPunch } from '../../animationSteps/playerPunch';
import { BattleStepFn } from '../../types';
import { playerSwordCharge } from '../default/playerSwordCharge';
import { walkToMiddle } from '../default/walkToMiddle';
import { playerPunchCharge } from '../killEnemy/playerPunchCharge';
import { playerAttackScene } from '../playerAttack/playerAttackScene';
import { playerAttackSceneEnd } from '../playerAttack/playerAttackSceneEnd';
import { enemyDodge } from './enemyDodge';
import { playerMiss } from './playerMiss';

export const playerMissScene: BattleStepFn[] = [
	walkToMiddle,
	playerMiss,
	enemyDodge,
	playerAttackSceneEnd,
];
