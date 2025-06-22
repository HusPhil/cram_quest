import { arenaMiddle, enemyPosOffSetX } from '../../../components/BattleArena';
import { BattleStepFn } from '../../types';

export const playerSwordCharge: BattleStepFn = ({
	next,
	setPlayerAction,
	setPlayerLoop,
	adjustZValues,
	getEnemyPosX,
	getPlayerPosX,
	setPlayerPosX,
}) => {
	setPlayerAction('walk');
	setPlayerLoop(true);
	adjustZValues('player');

	let chargeReached = false;
	const chargeTargetX = arenaMiddle - (enemyPosOffSetX + enemyPosOffSetX / 2); // Move LEFT toward enemy

	const walkInterval = setInterval(() => {
		if (getPlayerPosX() >= chargeTargetX) {
			chargeReached = true;
			setPlayerPosX(chargeTargetX);
		} else setPlayerPosX(getPlayerPosX() + 6);

		if (chargeReached) {
			next();
		}
	}, 50);

	return () => clearInterval(walkInterval);
};
