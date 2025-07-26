import { enemyAttack } from '../../animationSteps/enemyAttack';
import { playerHurt } from '../../animationSteps/playerHurt';
import { BattleStepFn } from '../../types';
import { walkToMiddle } from '../../animationSteps/walkToMiddle';
import { placeEnemyMiddle } from '../killEnemy/placeEnemyMiddle';
import { enemyAttackSceneEnd } from './enemyAttackSceneEnd';

export const enemyAttackScene: BattleStepFn[] = [
	walkToMiddle,
	enemyAttack,
	playerHurt,
	enemyAttackSceneEnd,
];
