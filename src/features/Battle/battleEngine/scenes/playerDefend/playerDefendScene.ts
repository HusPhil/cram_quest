import { walkToMiddleFar } from '../../animationSteps/walkToMiddleFar';
import { BattleStepFn } from '../../types';
import { playerDefend } from './playerDefend';

export const playerDefendScene: BattleStepFn[] = [
	walkToMiddleFar,
	playerDefend,
];
