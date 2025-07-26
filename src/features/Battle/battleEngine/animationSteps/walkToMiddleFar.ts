import { arenaMiddle, enemyPosOffSetX } from '../../components/BattleArena';
import { BattleStepFn } from '../types';

export const walkToMiddleFar: BattleStepFn = ({
	setEnemyAction,
	setPlayerPosX,
	setPlayerAction,
	setEnemyPosX,
	getPlayerPosX,
	getEnemyPosX,
	next,
}) => {
	// Define target positions
	const targetPlayerX =
		arenaMiddle - (enemyPosOffSetX + enemyPosOffSetX / 2) - 16;
	const targetEnemyX = arenaMiddle + enemyPosOffSetX / 2 + 8 * 3;
	const movementSpeed = 6;
	const movementInterval = 50; // ms

	// Initial animations
	setPlayerAction(getPlayerPosX() >= targetPlayerX ? 'idle' : 'walk');
	setEnemyAction('walk');
	// setEnemyPosX(48 * 3);

	let positionsReached = false;

	// Handle movement of both characters
	const interval = setInterval(() => {
		// Update player position
		// setPlayerPosX((prev) => {
		// 	if (prev >= targetPlayerX) {
		// 		setPlayerAction('idle');
		// 		return targetPlayerX;
		// 	}
		// 	return prev + movementSpeed;
		// });

		if (getPlayerPosX() >= targetPlayerX) {
			setPlayerAction('idle');
			setPlayerPosX(targetPlayerX);
		} else setPlayerPosX(getPlayerPosX() + movementSpeed);

		// Update enemy position
		// setEnemyPosX((prev) => {
		// 	if (prev <= targetEnemyX) return targetEnemyX;
		// 	return prev - movementSpeed;
		// });

		// if (getEnemyPosX() <= targetEnemyX) {
		// } else
		setEnemyPosX(getEnemyPosX() - movementSpeed);

		// Check if both characters have reached their targets
		const playerReachedTarget = getPlayerPosX() >= targetPlayerX;
		const enemyReachedTarget = getEnemyPosX() <= targetEnemyX;

		if (playerReachedTarget && enemyReachedTarget && !positionsReached) {
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
