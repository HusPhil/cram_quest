import { arenaMiddle, enemyPosOffSetX } from '../../../components/BattleArena';
import { BattleStepFn } from '../../types';

export const walkToMiddle: BattleStepFn = ({
	setEnemyAction,
	setPlayerPosX,
	setPlayerAction,
	setEnemyPosX,
	getPlayerPosX,
	getEnemyPosX,
	next,
}) => {
	// Define target positions
	const targetPlayerX = arenaMiddle - enemyPosOffSetX;
	const targetEnemyX = arenaMiddle + enemyPosOffSetX;
	const movementSpeed = 6;
	const movementInterval = 50; // ms

	// Initial animations
	setPlayerAction(getPlayerPosX() >= targetPlayerX ? 'idle' : 'walk');
	setEnemyAction('walk');
	setEnemyPosX(48 * 3);

	let positionsReached = false;

	// Handle movement of both characters
	const interval = setInterval(() => {
		// Update player position
		setPlayerPosX((prev) => {
			if (prev >= targetPlayerX) {
				setPlayerAction('idle');
				return targetPlayerX;
			}
			return prev + movementSpeed;
		});

		// Update enemy position
		setEnemyPosX((prev) => {
			if (prev <= targetEnemyX) return targetEnemyX;
			return prev - movementSpeed;
		});

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
