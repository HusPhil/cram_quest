import { BattleStepFn } from '../../types';
import { walkToMiddle } from '../../animationSteps/walkToMiddle';
import { playerDefendSceneEnd } from './playerDefendSceneEnd';
import { playerDefend } from './playerDefend';
import { walkToMiddleFar } from '../../animationSteps/walkToMiddleFAr';
import { playerDodge } from '../enemyMiss/playerDodge';

export const playerDefendScene: BattleStepFn[] = [
	walkToMiddleFar,
	playerDefend,
	playerDefendSceneEnd,
];
