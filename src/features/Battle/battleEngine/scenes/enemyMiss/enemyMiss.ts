import { BattleStepFn } from '../../types';

export const enemyMiss: BattleStepFn = ({
	next,
	setPlayerAction,
	setEnemyAction,
	setEnemyLoop,
	setPlayerLoop,
	adjustZValues,
}) => {
	adjustZValues('player');
	setEnemyAction('attack');

	setEnemyLoop(false);
	setPlayerLoop(false);
	setPlayerAction('idle');

	const transitionDelay = setTimeout(() => {
		next();
	}, 50);

	return () => clearTimeout(transitionDelay);
};
