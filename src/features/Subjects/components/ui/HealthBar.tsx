import React, { JSX } from 'react';
import { TbHeart, TbHeartBroken, TbHeartFilled } from 'react-icons/tb';

// Define the props interface for the HealthBar component
interface HealthBarProps {
	health: number; // Current health value
	maxHealth: number; // Maximum health value
	iconSize?: number; // Optional: Size of each heart icon in pixels (default: 32)
	iconColor?: string; // Optional: Color of the heart icons (default: red-500 from Tailwind)
	label?: string; // Optional: A label to display above the health bar (e.g., "Player Health")
	className?: string;
	labelClassName?: string;
}

/**
 * HealthBar Component
 * Displays a health bar using heart icons (filled, broken, empty)
 * and a numerical health display.
 * Each heart represents 20 health points.
 *
 * @param {HealthBarProps} props - The component props.
 * @returns {JSX.Element} The rendered HealthBar component.
 */
const HealthBar: React.FC<HealthBarProps> = ({
	health,
	maxHealth,
	iconSize = 32, // Default icon size
	iconColor = '#ef4444', // Default color (Tailwind's red-500)
	className,
	labelClassName,
	label, // Optional label
}) => {
	// Ensure health doesn't go below zero or above maxHealth for display purposes
	const clampedHealth = Math.max(0, Math.min(health, maxHealth));

	// Define how many health points one heart represents
	const healthPerHeart = 20;

	// Calculate the total number of heart icons needed
	const totalHearts = Math.ceil(maxHealth / healthPerHeart);

	// Array to hold the heart icons
	const hearts: JSX.Element[] = [];

	// Loop through each potential heart icon position
	for (let i = 1; i <= totalHearts; i++) {
		// Calculate the health threshold for this specific heart
		const currentHeartThreshold = i * healthPerHeart;
		const previousHeartThreshold = (i - 1) * healthPerHeart;

		if (clampedHealth >= currentHeartThreshold) {
			// If current health is greater than or equal to this heart's full value, it's a filled heart
			hearts.push(
				<TbHeartFilled
					key={`heart-filled-${i}`}
					size={iconSize}
					style={{ color: iconColor }}
					className="drop-shadow-md" // Add a subtle shadow for better visual depth
				/>
			);
		} else if (
			clampedHealth > previousHeartThreshold &&
			clampedHealth < currentHeartThreshold
		) {
			// If current health is fractional and falls within this heart's segment, it's a broken heart
			hearts.push(
				<TbHeartBroken
					key={`heart-broken-${i}`}
					size={iconSize}
					style={{ color: iconColor }}
					className="drop-shadow-md"
				/>
			);
		} else {
			// Otherwise, it's an empty heart
			hearts.push(
				<TbHeart
					key={`heart-empty-${i}`}
					size={iconSize}
					style={{ color: iconColor, opacity: 0.4 }} // Make empty hearts slightly transparent
					className="drop-shadow-md"
				/>
			);
		}
	}

	return (
		<div className={'rounded-xl border-yellow-600 ' + className}>
			{label && (
				<p
					className={
						'text-amber-400 text-sm md:text-md font-bold mb-2 uppercase tracking-wide ' +
						labelClassName
					}
				>
					{label}
				</p>
			)}
			<div className="flex items-center gap-1 md:gap-2">{hearts}</div>
			<p className="mt-2 text-white font-bold">
				{/* Display numerical health */}
				{clampedHealth} / {maxHealth}
			</p>
		</div>
	);
};

export default HealthBar;
