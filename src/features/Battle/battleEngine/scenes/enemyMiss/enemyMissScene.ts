import { BattleStepFn } from '../../types';
import { walkToMiddle } from '../../animationSteps/walkToMiddle';
import { enemyMiss } from './enemyMiss';
import { enemyMissSceneEnd } from './enemyMissSceneEnd';
import { playerDodge } from './playerDodge';

export const enemyMissScene: BattleStepFn[] = [
	walkToMiddle,
	enemyMiss,
	playerDodge,
	enemyMissSceneEnd,
];
