import startKnockback from '../../utils/startKnockback';
import { BattleStepFn } from '../types';

export const playerEnemyPushedHurt: BattleStepFn = ({
	next,
	adjustZValues,
	setEnemyLoop,
	setEnemyAction,
	setPlayerAction,
	setPlayerLoop,
	getPlayerPosX,
	setPlayerPosX,
}) => {
	adjustZValues('enemy');

	setEnemyAction('idle');
	setPlayerAction('hurt');

	setEnemyLoop(true);
	setPlayerLoop(false);

	const playerKnockBackCleanup = startKnockback({
		fromX: getPlayerPosX(),
		setX: setPlayerPosX,
		direction: 'left',
		knockbackDmg: 16 * 3,
		onDone: () => next(),
	});

	return () => {
		playerKnockBackCleanup();
	};
};
