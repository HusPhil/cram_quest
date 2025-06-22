import { enemyPosOffSetX } from '../../components/BattleArena';
import { BattleStepFn } from '../types';

export const playerExit: BattleStepFn = ({
	next,
	end,
	getPlayerPosX,
	setPlayerAction,
	setEnemyPosX,
	setPlayerPosX,
	setPlayerLoop,
	adjustZValues,
}) => {
	adjustZValues('player');
	setPlayerAction('celebrate');
	setPlayerLoop(true);
	const exitPosX = 48 * 5;
	let exitReached = false;

	let walkInterval: number;

	walkInterval = window.setInterval(() => {
		if (getPlayerPosX() >= exitPosX) {
			exitReached = true;
			setPlayerPosX(exitPosX);
		} else setPlayerPosX(getPlayerPosX() + 6);

		if (exitReached) {
			setEnemyPosX(48 * 3);
			setPlayerPosX(0);
			setPlayerAction('idle');
			next();
		}
	}, 50);

	return () => {
		clearInterval(walkInterval);
		end();
	};
};
