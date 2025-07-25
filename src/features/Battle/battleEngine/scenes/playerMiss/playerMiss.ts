import { BattleStepFn } from '../../types';

export const playerMiss: BattleStepFn = ({
	next,
	setPlayerAction,
	setEnemyAction,
	setEnemyLoop,
	setPlayerLoop,
	adjustZValues,
}) => {
	adjustZValues('player');
	setPlayerAction('attack_1');

	setEnemyLoop(false);
	setPlayerLoop(false);
	setEnemyAction('idle');

	const transitionDelay = setTimeout(() => {
		next();
	}, 180);

	return () => clearTimeout(transitionDelay);
};
