import { arenaMiddle, enemyPosOffSetX } from '../../../components/BattleArena';
import { BattleStepFn } from '../../types';

export const placeEnemyMiddle: BattleStepFn = ({
	next,
	setEnemyAction,
	setPlayerAction,
	setEnemyLoop,
	getEnemyPosX,
	setEnemyPosX,
}) => {
	setEnemyLoop(true);
	setPlayerAction('idle');
	setEnemyAction('walk');
	const targetX = arenaMiddle + enemyPosOffSetX;
	const checkIfEnemyInTargetX = setInterval(() => {
		if (getEnemyPosX() <= targetX) {
			setEnemyAction('idle');
			// setEnemyPosX(getEnemyPosX() + 6);
			next();
		} else {
			setEnemyPosX(getEnemyPosX() - 6);
		}
	}, 50);

	return () => clearTimeout(checkIfEnemyInTargetX);
};
