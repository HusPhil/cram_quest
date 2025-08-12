import { BattleStepFn } from '../../types';
import { walkToMiddle } from '../../animationSteps/walkToMiddle';
import { playerAttackSceneEnd } from '../playerAttack/playerAttackSceneEnd';
import { enemyDodge } from './enemyDodge';
import { playerMiss } from './playerMiss';

export const playerAttackMissScene: BattleStepFn[] = [
	walkToMiddle,
	playerMiss,
	enemyDodge,
	playerAttackSceneEnd,
];
