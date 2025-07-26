import { BattleStepFn } from '../../types';
import { walkToMiddleFar } from '../../animationSteps/walkToMiddleFar';
import { playerDefend } from '../playerDefend/playerDefend';
import { playerDefendSceneEnd } from '../playerDefend/playerDefendSceneEnd';
import { playerEnemyPushedHurt } from '../../animationSteps/playerEnemyPushedHurt';

export const playerDefendMissScene: BattleStepFn[] = [
	playerEnemyPushedHurt,
	playerDefendSceneEnd,
];
