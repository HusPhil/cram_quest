import { BattleStepFn } from '../../types';

export const playerDodge: BattleStepFn = ({
	next,
	setPlayerAction,
	setPlayerLoop,
	setPlayerPosX,
	getPlayerPosX,
}) => {
	setPlayerLoop(false);
	setPlayerAction('idle');
	setPlayerPosX(getPlayerPosX() - 16 * 3);

	const transitionDelay = setTimeout(() => {
		next();
	}, 300);

	return () => clearTimeout(transitionDelay);
};
