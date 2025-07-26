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
	const barRef = useRef<HTMLDivElement>(null); // Ref to get the actual width of the bar

	// Calculate the start position for the centered green zone
	const greenZoneStart = (100 - hitTargetWidth) / 2;
	const greenZoneEnd = greenZoneStart + hitTargetWidth;

	// State to store cursor width in percentage relative to the bar's width
	const [cursorHalfWidthInPercent, setCursorHalfWidthInPercent] = useState(0);

	useEffect(() => {
		// Calculate cursor width in percentage once the bar is rendered
		const calculateCursorPercentage = () => {
			if (barRef.current) {
				const barWidthPx = barRef.current.offsetWidth;
				if (barWidthPx > 0) {
					// cursorWidthPx / barWidthPx * 100 / 2
					setCursorHalfWidthInPercent(
						((cursorWidth / barWidthPx) * 100) / 2
					);
				}
			}
		};

		calculateCursorPercentage(); // Calculate on mount

		// Add a resize listener to recalculate if the window (and thus bar) size changes
		window.addEventListener('resize', calculateCursorPercentage);
		return () =>
			window.removeEventListener('resize', calculateCursorPercentage);
	}, [cursorWidth]); // Recalculate if cursorWidth prop changes

	useEffect(() => {
		const animate = (currentTime: number) => {
			if (!lastTime.current) lastTime.current = currentTime;
			const deltaTime = currentTime - lastTime.current;
			lastTime.current = currentTime;

			setSliderPosition((prevPos) => {
				let newPos = prevPos + (direction * speed * deltaTime) / 1000;

				// Adjust boundaries by half of the cursor's width in percentage
				// The cursor's center is 'newPos'. Its left edge is 'newPos - cursorHalfWidthInPercent'.
				// Its right edge is 'newPos + cursorHalfWidthInPercent'.

				const cursorLeftEdge = newPos - cursorHalfWidthInPercent;
				const cursorRightEdge = newPos + cursorHalfWidthInPercent;

				// If right edge goes past 100, bounce back from 100
				if (cursorRightEdge >= 100) {
					newPos = 100 - cursorHalfWidthInPercent; // Set center so right edge is at 100
					setDirection(-1);
				}
				// If left edge goes past 0, bounce back from 0
				else if (cursorLeftEdge <= 0) {
					newPos = cursorHalfWidthInPercent; // Set center so left edge is at 0
					setDirection(1);
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
	}, [direction, speed, cursorHalfWidthInPercent]); // Add cursorHalfWidthInPercent to dependencies

	const handleStopClick = () => {
		if (animationFrameId.current) {
			cancelAnimationFrame(animationFrameId.current); // Stop the animation
		}

		// Define the target zone for the cursor's *center*
		// The center of the green zone is `greenZoneStart + hitTargetWidth / 2`.
		// We want the sliderPosition to be as close to this center as possible.

		// However, if the goal is to check if the cursor is *within* the green zone,
		// we should check if any part of the cursor overlaps the green zone.
		// For a hit, the cursor's actual visible area must intersect the green zone.
		// A common interpretation for "hit target" is when the center of the cursor
		// is within the center of the target zone.

		// Let's stick with the most common interpretation: the cursor's *center* must be within the green zone.
		// The visual error you saw might be due to the animation stopping *just* outside
		// and the `sliderPosition` being a float.

		const isWithinGreenZone =
			sliderPosition >= greenZoneStart && sliderPosition <= greenZoneEnd;

		// Pass accuracy info back to parent
		// The `finalPosition` passed to `onStop` is `sliderPosition` (center of the cursor).
		onStop(isWithinGreenZone, sliderPosition);
	};

	return (
		<div className="bg-gray-800 p-4 rounded-md border-2 border-amber-600">
			<h3 className="text-amber-500 text-lg font-bold mb-3 text-center">
				ACCURACY
			</h3>
			<p className="text-white text-sm mb-4 text-center">
				Click STOP! when the bar is in the green zone!
			</p>
			<div
				ref={barRef} // Attach the ref here
				className="w-full h-8 bg-gray-600 rounded-full overflow-hidden relative"
			>
				{/* Green Zone (Hit Target) */}
				<div
					className="absolute h-full bg-green-500"
					style={{
						left: `${greenZoneStart}%`,
						width: `${hitTargetWidth}%`,
					}}
				></div>
				{/* Sliding Yellow Bar (Cursor) */}
				<div
					className="absolute h-full bg-yellow-400 rounded-full"
					style={{
						// This calculation places the center of the cursor at `sliderPosition%`
						left: `calc(${sliderPosition}% - ${cursorWidth / 2}px)`,
						width: `${cursorWidth}px`,
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
