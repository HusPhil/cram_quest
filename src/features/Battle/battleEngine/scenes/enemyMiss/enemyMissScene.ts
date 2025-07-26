import { enemyHurt } from '../../animationSteps/enemyHurt';
import { playerPunch } from '../../animationSteps/playerPunch';
import { playerSwordAttack1 } from '../../animationSteps/playerSwordAttack1';
import { playerSwordAttack2 } from '../../animationSteps/playerSwordAttack2';
import { BattleStepFn } from '../../types';
import { playerSwordCharge } from '../default/playerSwordCharge';
import { walkToMiddle } from '../../animationSteps/walkToMiddle';
import { enemyAttackSceneEnd } from '../enemyAttack/enemyAttackSceneEnd';
import { playerPunchCharge } from '../killEnemy/playerPunchCharge';
import { playerAttackSceneEnd } from '../playerAttack/playerAttackSceneEnd';
import { enemyMiss } from './enemyMiss';
import { enemyMissSceneEnd } from './enemyMissSceneEnd';
import { playerDodge } from './playerDodge';

export const enemyMissScene: BattleStepFn[] = [
	walkToMiddle,
	enemyMiss,
	playerDodge,
	enemyMissSceneEnd,
];
