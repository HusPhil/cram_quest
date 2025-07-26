import { BattleStepFn } from '../../types';

export const playerDefend: BattleStepFn = ({
	next,
	setPlayerAction,
	setEnemyAction,
	adjustZValues,
	setPlayerPosX,
	getPlayerPosX,
	setEnemyPosX,
	getEnemyPosX,
}) => {
	adjustZValues('player');
	setPlayerAction('attack_3');
	setEnemyAction('attack');

	setEnemyPosX(getEnemyPosX());
	setPlayerPosX(getPlayerPosX());

	const transitionDelay = setTimeout(() => {
		next();
	}, 300);

	return () => clearTimeout(transitionDelay);
};
