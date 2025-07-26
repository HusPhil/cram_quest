import React, { useState, useEffect, useRef } from 'react';
import PixelButton from '../../../../components/PixelButton';
import { useBattleEngineStore } from '../../../Battle/stores/battleEngineStore';
import { killEnemyScene } from '../../../Battle/battleEngine/scenes/killEnemy/killEnemyScene';
import { playerAttackScene } from '../../../Battle/battleEngine/scenes/playerAttack/playerAttackScene';
import { enemyAttackScene } from '../../../Battle/battleEngine/scenes/enemyAttack/enemyAttackScene';
import { defaultBattleScene } from '../../../Battle/battleEngine/scenes/default/defaultBattleScene';
import { toast } from 'react-toastify';
import { playerMissScene } from '../../../Battle/battleEngine/scenes/playerMiss/playerMissScene';
import { enemyMissScene } from '../../../Battle/battleEngine/scenes/enemyMiss/enemyMissScene';
import { playerDefendScene } from '../../../Battle/battleEngine/scenes/playerDefend/playerDefendScene';
import { TimingBar } from '../ui/TimingBar';

// Define the props for BossBattleContorols
interface BossBattleControlsProps {
	handlePlayerAttack: (damage: number) => void;
	handleEnemyAttack: (damage: number, playerDefense: number) => void; // This will likely be called by game logic, not directly here.
}

const BossBattleContorls: React.FC<BossBattleControlsProps> = ({
	handlePlayerAttack,
	handleEnemyAttack, // Destructure the prop, but it won't be called directly by timing bar success/failure
}) => {
	const [actionPhase, setActionPhase] = useState<string | null>(null); // 'attack', 'defend', or null
	const [currentSpeed, setCurrentSpeed] = useState<number>(100); // State to control the speed
	const [currentHitTargetWidth, setCurrentHitTargetWidth] =
		useState<number>(40); // State to control hit target width
	const [currentCursorWidth, setCurrentCursorWidth] = useState<number>(32); // State to control cursor width

	// New state for the accuracy message
	const [accuracyMessage, setAccuracyMessage] = useState<string | null>(null);

	const queueCustomScene = useBattleEngineStore(
		(state) => state.queueCustomScene
	);

	const handleAttackClick = () => {
		setActionPhase('attack');
		setCurrentSpeed(150); // Faster for attack
		setCurrentHitTargetWidth(30); // Smaller hit target for attack
		setCurrentCursorWidth(10); // Thinner cursor for attack
		setAccuracyMessage(null); // Clear any previous message
	};

	const handleDefendClick = () => {
		setActionPhase('defend');
		setCurrentSpeed(80); // Slower for defend
		setCurrentHitTargetWidth(30); // Wider hit target for defend
		setCurrentCursorWidth(10); // Wider cursor for defend
		setAccuracyMessage(null); // Clear any previous message
	};

	const handlePlayerAttackSceneEnd = (damage: number) => {
		handlePlayerAttack(damage);
		setTimeout(
			() =>
				queueCustomScene(enemyAttackScene, 'enemyAttackScene', () =>
					setActionPhase(null)
				),
			100
		);
	};

	const handleTimingBarStop = (isHit: boolean, finalPosition: number) => {
		// Reset action phase regardless of hit or miss

		let message = '';
		let damage = 0; // Default damage

		if (actionPhase === 'attack') {
			if (isHit) {
				message = `Great timing! You hit the green zone at ${finalPosition.toFixed(
					2
				)}%.`;
				// Example: Calculate damage based on accuracy.
				// For simplicity, let's say a perfect hit (middle of green zone) deals max damage.
				// This is a placeholder; adjust your damage calculation as needed.
				const accuracyPercentage = Math.abs(
					finalPosition -
						((100 - currentHitTargetWidth) / 2 +
							currentHitTargetWidth / 2)
				);
				// A simple linear scale: more accurate = more damage
				damage = 5 + (1 - accuracyPercentage / 30) * 10; // Base 20 damage, up to 30 for perfect hit
				damage = Math.max(1, Math.round(damage)); // Ensure minimum 1 damage
				queueCustomScene(
					playerAttackScene,
					'playerAttackScene',
					() => handlePlayerAttackSceneEnd(damage),
					() => undefined
				);
				message += ` You dealt ${damage} damage!`;
			} else {
				message = `Miss! You stopped at ${finalPosition.toFixed(
					2
				)}%. Try again!`;
				// Optionally, deal minimal or no damage on a miss
				damage = 5; // Example: minimal damage on miss
				handlePlayerAttack(damage); // Still call, but with low damage
				queueCustomScene(
					playerMissScene,
					'playerMissScene',
					() => handlePlayerAttackSceneEnd(damage),
					() => toast.info('You missed!')
				);

				message += ` You dealt ${damage} damage (missed).`;
			}
		} else if (actionPhase === 'defend') {
			if (isHit) {
				message = `Great timing! You successfully defended at ${finalPosition.toFixed(
					2
				)}%.`;
				// In a real game, this might set a defense buff for the player
				// or reduce incoming damage from the next enemy attack.
				// For this component, we don't directly call handleEnemyAttack here,
				// as that's usually triggered by the enemy's turn.
				const accuracyPercentage = Math.abs(
					finalPosition -
						((100 - currentHitTargetWidth) / 2 +
							currentHitTargetWidth / 2)
				);
				// A simple linear scale: more accurate = more damage
				damage = 20 + (1 - accuracyPercentage / 50) * 10; // Base 20 damage, up to 30 for perfect hit
				damage = Math.max(1, Math.round(damage)); // Ensure minimum 1 damage
				handleEnemyAttack(damage / 2, damage); // Call the player attack function
				message += ` You dealt ${damage} damage!`;

				queueCustomScene(
					playerDefendScene,
					'playerDefendScene',
					undefined,
					() => {
						toast.info('You dodged!');
						setActionPhase(null);
					}
				);
			} else {
				message = `Defend failed! You stopped at ${finalPosition.toFixed(
					2
				)}%.`;
				// Player might take full damage from next enemy attack
				queueCustomScene(enemyAttackScene, 'enemyAttackScene', () =>
					setActionPhase(null)
				);
			}
		}

		setAccuracyMessage(message);
	};

	return (
		<div className="flex flex-col items-center w-full">
			{/* Display accuracy message if available */}
			{/* {accuracyMessage && (
				<div
					className={`mt-4 p-3 rounded-md text-lg font-bold text-center
                                ${
									accuracyMessage.includes('Great timing')
										? 'bg-green-700 text-white'
										: 'bg-red-700 text-white'
								}`}
				>
					{accuracyMessage}
				</div>
			)} */}

			{actionPhase === null ? (
				// Show ATTACK and DEFEND buttons initially
				<div className="flex gap-3 w-full   ">
					<PixelButton
						className="py-2 px-8"
						colors={{
							face: '#facc15',
							shadow: '#ca8a04',
							border: '#a16207',
							text: '#1f2937',
						}}
						onClick={handleAttackClick}
					>
						<p>ATTACK</p>
					</PixelButton>
					<PixelButton
						className="py-2 px-8"
						colors={{
							face: '#facc15',
							shadow: '#ca8a04',
							border: '#a16207',
							text: '#1f2937',
						}}
						onClick={handleDefendClick}
					>
						<p>DEFEND</p>
					</PixelButton>
				</div>
			) : (
				// Show timing bar when an action is selected
				<div className="mt-3 w-full max-w-lg">
					<TimingBar
						onStop={handleTimingBarStop}
						speed={currentSpeed}
						hitTargetWidth={currentHitTargetWidth}
						cursorWidth={currentCursorWidth}
					/>
				</div>
			)}
		</div>
	);
};

export default BossBattleContorls;
