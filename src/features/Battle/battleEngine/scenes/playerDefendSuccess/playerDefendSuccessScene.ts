import { BattleStepFn } from '../../types';
import { playerDefendSceneEnd } from '../playerDefend/playerDefendSceneEnd';
import { playerDefend } from '../playerDefend/playerDefend';
import { playerEnemyPushed } from '../../animationSteps/playerEnemyPushed';
import { walkToMiddleFar } from '../../animationSteps/walkToMiddleFar';

export const playerDefendSuccessScene: BattleStepFn[] = [
	playerEnemyPushed,
	playerDefendSceneEnd,
];
