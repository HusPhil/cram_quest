import { BattleStepFn } from '../../types';

export const playerDefendSceneEnd: BattleStepFn = ({
	next,
	setPlayerAction,
	setEnemyAction,
	setEnemyLoop,
	setPlayerLoop,
	getPlayerPosX,
	setPlayerPosX,
	getEnemyPosX,
	setEnemyPosX,
}) => {
	setEnemyAction('idle');
	setPlayerAction('idle');
	setEnemyLoop(true);
	setPlayerLoop(true);

	// Define target positions
	const movementSpeed = 16;
	const targetPlayerPosX = 16;
	const targetEnemyPosX = 48 * 3 - 16;
	const movementInterval = 20; // ms

	// Initial animations
	// setPlayerPosX(48 * 3);

	let positionsReached = false;

	// Handle movement of both characters
	const interval = setInterval(() => {
		if (getPlayerPosX() - movementSpeed <= targetPlayerPosX) {
			setPlayerPosX(getPlayerPosX() - movementSpeed);
		} else {
			setPlayerPosX(targetPlayerPosX);
		}

		if (getEnemyPosX() + movementSpeed >= targetEnemyPosX) {
			setEnemyPosX(getEnemyPosX() + movementSpeed);
		} else {
			setEnemyPosX(targetEnemyPosX);
		}

		// Check if both characters have reached their targets

		if (
			targetPlayerPosX >= getPlayerPosX() &&
			targetEnemyPosX <= getEnemyPosX() &&
			!positionsReached
		) {
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
