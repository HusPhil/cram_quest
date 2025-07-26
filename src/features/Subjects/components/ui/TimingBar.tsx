import { useEffect, useRef, useState } from 'react';
import PixelButton from '../../../../components/PixelButton';

// Define the props interface for TimingBar
interface TimingBarProps {
	onStop: (isHit: boolean, finalPosition: number) => void;
	speed?: number; // Optional prop for controlling speed (units per second)
	hitTargetWidth?: number; // Optional prop for the width of the green hit target zone (percentage)
	cursorWidth?: number; // Optional prop for the width of the yellow cursor in pixels
}

// TimingBar component with sliding functionality
export const TimingBar = ({
	onStop,
	speed = 100, // Default speed: 100 units per second
	hitTargetWidth = 40, // Default green zone width: 40%
	cursorWidth = 32, // Default cursor width: 32px (matches Tailwind w-8)
}: TimingBarProps) => {
	const [sliderPosition, setSliderPosition] = useState<number>(0); // 0 to 100 representing percentage
	const [direction, setDirection] = useState<1 | -1>(1); // 1 for right, -1 for left
	const animationFrameId = useRef<number | null>(null);
	const lastTime = useRef<number>(0);

	// Calculate the start position for the centered green zone
	const greenZoneStart = (100 - hitTargetWidth) / 2;
	const greenZoneEnd = greenZoneStart + hitTargetWidth;

	useEffect(() => {
		const animate = (currentTime: number) => {
			if (!lastTime.current) lastTime.current = currentTime;
			const deltaTime = currentTime - lastTime.current;
			lastTime.current = currentTime;

			setSliderPosition((prevPos) => {
				// Calculate movement based on time elapsed to ensure consistent speed across different frame rates
				let newPos = prevPos + (direction * speed * deltaTime) / 1000; // speed is now units per second

				// Boundary checks
				if (newPos >= 100) {
					newPos = 100;
					setDirection(-1); // Change direction to left
				} else if (newPos <= 0) {
					newPos = 0;
					setDirection(1); // Change direction to right
				}
				return newPos;
			});
			animationFrameId.current = requestAnimationFrame(animate);
		};

		animationFrameId.current = requestAnimationFrame(animate);

		return () => {
			if (animationFrameId.current) {
				cancelAnimationFrame(animationFrameId.current);
			}
		};
	}, [direction, speed]); // Re-run effect if direction or speed changes

	const handleStopClick = () => {
		if (animationFrameId.current) {
			cancelAnimationFrame(animationFrameId.current); // Stop the animation
		}
		const isWithinGreenZone =
			sliderPosition >= greenZoneStart && sliderPosition <= greenZoneEnd;
		onStop(isWithinGreenZone, sliderPosition); // Pass accuracy info back to parent
	};

	return (
		<div className="bg-gray-800 p-4 rounded-md border-2 border-amber-600">
			<h3 className="text-amber-500 text-lg font-bold mb-3 text-center">
				ACCURACY
			</h3>
			<p className="text-white text-sm mb-4 text-center">
				Click STOP! when the bar is in the green zone!
			</p>
			<div className="w-full h-8 bg-gray-600 rounded-full overflow-hidden relative">
				{/* Green Zone (Hit Target) */}
				<div
					className="absolute h-full bg-green-500"
					style={{
						left: `${greenZoneStart}%`, // Dynamically calculated for centering
						width: `${hitTargetWidth}%`, // Use hitTargetWidth directly
					}}
				></div>
				{/* Sliding Yellow Bar (Cursor) */}
				<div
					className="absolute h-full bg-yellow-400 rounded-full"
					style={{
						left: `calc(${sliderPosition}% - ${cursorWidth / 2}px)`, // Adjust by half of the cursor width to center it
						width: `${cursorWidth}px`, // Use cursorWidth directly
					}}
				></div>
			</div>
			<div className="mt-4 flex justify-center">
				<PixelButton
					className="py-2 px-8 text-lg"
					colors={{
						face: '#facc15',
						shadow: '#ca8a04',
						border: '#a16207',
						text: '#1f2937',
					}}
					onClick={handleStopClick}
				>
					<p>STOP!</p>
				</PixelButton>
			</div>
		</div>
	);
};
