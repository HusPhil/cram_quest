import startKnockback from '../../../utils/startKnockback';
import { BattleStepFn } from '../../types';

export const playerEnemyPushed: BattleStepFn = ({
	next,
	adjustZValues,
	setEnemyLoop,
	setEnemyAction,
	setPlayerAction,
	setPlayerLoop,
	getPlayerPosX,
	setPlayerPosX,
	setEnemyPosX,
	getEnemyPosX,
}) => {
	adjustZValues('enemy');

	setEnemyAction('walk');
	setPlayerAction('walk');

	setEnemyLoop(true);
	setPlayerLoop(false);

	const playerKnockBackCleanup = startKnockback({
		fromX: getPlayerPosX(),
		setX: setPlayerPosX,
		direction: 'left',
		knockbackDmg: 35,
		onDone: () => {},
	});

	const enemyKnockBackCleanup = startKnockback({
		fromX: getEnemyPosX(),
		setX: setEnemyPosX,
		direction: 'right',
		knockbackDmg: 35,
		onDone: () => next(),
	});

	return () => {
		playerKnockBackCleanup();
		enemyKnockBackCleanup();
	};
};
