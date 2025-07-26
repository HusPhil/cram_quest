import { BattleStepFn } from '../../types';

export const playerDefend: BattleStepFn = ({
	next,
	setPlayerAction,
	setEnemyAction,
	adjustZValues,
	setPlayerPosX,
	getPlayerPosX,
}) => {
	adjustZValues('player');
	setPlayerAction('attack_3');
	setEnemyAction('attack');

	setPlayerPosX(getPlayerPosX() + 12);

	const transitionDelay = setTimeout(() => {
		next();
	}, 300);

	return () => clearTimeout(transitionDelay);
};
