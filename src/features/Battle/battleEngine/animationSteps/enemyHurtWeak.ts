import startKnockback from '../../utils/startKnockback';
import { BattleStepFn } from '../types';

export const enemyHurtWeak: BattleStepFn = ({
	next,
	setPlayerLoop,
	setPlayerAction,
	setEnemyAction,
	setEnemyLoop,
	adjustZValues,
	getEnemyPosX,
	setEnemyPosX,
}) => {
	setPlayerLoop(true);
	setEnemyAction('hurt');
	setPlayerAction('idle');
	setEnemyLoop(false);
	let cleanup: (() => void) | undefined;

	adjustZValues('enemy');
	const handleKnockbackDone = () => {
		const transitionDelay = setTimeout(() => {
			adjustZValues('player');
			next();
		}, 500);
		return () => clearTimeout(transitionDelay);
	};

	cleanup = startKnockback({
		fromX: getEnemyPosX(),
		setX: setEnemyPosX,
		direction: 'right',
		knockbackDmg: 20,
		onDone: () => next(),
	});

	return () => {
		if (cleanup) {
			cleanup();
		}
	};
};
