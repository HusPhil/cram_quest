import { BattleStepFn } from '../../types';

export const enemyAttackSceneEnd: BattleStepFn = ({
	next,
	setPlayerAction,
	setPlayerLoop,
	getEnemyPosX,
	setEnemyPosX,
}) => {
	setPlayerAction('idle');
	setPlayerLoop(true);

	// Define target positions
	const movementSpeed = 8;
	const targetPosX = 48 * 3 - 16;
	const movementInterval = 20; // ms

	// Initial animations
	// setEnemyPosX(48 * 3);

	let positionsReached = false;

	// Handle movement of both characters
	const interval = setInterval(() => {
		setEnemyPosX(getEnemyPosX() + movementSpeed);

		// Check if both characters have reached their targets

		if (targetPosX <= getEnemyPosX() && !positionsReached) {
			positionsReached = true;
			clearInterval(interval);
			next();
		}
	}, movementInterval);

	// Cleanup function
	return () => {
		clearInterval(interval);
	};
};
