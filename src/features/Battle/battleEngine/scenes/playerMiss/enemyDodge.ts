import { BattleStepFn } from '../../types';

export const enemyDodge: BattleStepFn = ({
	next,
	setEnemyAction,
	setEnemyLoop,
	setEnemyPosX,
	getEnemyPosX,
}) => {
	setEnemyLoop(false);
	setEnemyAction('idle');
	setEnemyPosX(getEnemyPosX() + 16 * 2);

	const transitionDelay = setTimeout(() => {
		next();
	}, 300);

	return () => clearTimeout(transitionDelay);
};
