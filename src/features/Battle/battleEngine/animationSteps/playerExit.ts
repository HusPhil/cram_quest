import { enemyPosOffSetX } from '../../components/BattleArena';
import { BattleStepFn } from '../types';

export const playerExit: BattleStepFn = ({
	next,
	end,
	setPlayerAction,
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
		setPlayerPosX((prev) => {
			if (prev >= exitPosX) {
				exitReached = true;
				return exitPosX;
			}
			return prev + 6;
		});

		if (exitReached) {
			setPlayerPosX(0);
			setPlayerAction('idle');
			next();
			// end();
		}
	}, 50);

	return () => {
		clearInterval(walkInterval);
	};
};
