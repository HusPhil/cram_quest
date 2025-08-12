import { BattleStepFn } from '../../types';
import { playerDefendSceneEnd } from '../playerDefend/playerDefendSceneEnd';
import { playerEnemyPushed } from '../../animationSteps/playerEnemyPushed';

export const playerDefendSuccessScene: BattleStepFn[] = [
	playerEnemyPushed,
	playerDefendSceneEnd,
];
