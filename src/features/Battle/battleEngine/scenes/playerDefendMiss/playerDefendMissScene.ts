import { BattleStepFn } from '../../types';
import { playerDefendSceneEnd } from '../playerDefend/playerDefendSceneEnd';
import { playerEnemyPushedHurt } from '../../animationSteps/playerEnemyPushedHurt';

export const playerDefendMissScene: BattleStepFn[] = [
	playerEnemyPushedHurt,
	playerDefendSceneEnd,
];
