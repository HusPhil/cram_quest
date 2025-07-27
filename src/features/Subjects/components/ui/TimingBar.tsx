import { useEffect, useRef, useState } from 'react';
import PixelButton from '../../../../components/PixelButton';

// Define the props interface for TimingBar
interface TimingBarProps {
	onStop: (isHit: boolean, finalPosition: number) => void;
	disabled?: boolean; // This prop disables the *entire bar*, not just the button
	speed?: number; // Optional prop for controlling speed (units per second)
	hitTargetWidth?: number; // Optional prop for the width of the green hit target zone (percentage)
	cursorWidth?: number; // Optional prop for the width of the yellow cursor in pixels
}

// TimingBar component with sliding functionality
export const TimingBar = ({
	onStop,
	disabled, // This prop controls the overall bar's active state
	speed = 100, // Default speed: 100 units per second
	hitTargetWidth = 40, // Default green zone width: 40%
	cursorWidth = 32, // Default cursor width: 32px (matches Tailwind w-8)
}: TimingBarProps) => {
	const [sliderPosition, setSliderPosition] = useState<number>(0); // 0 to 100 representing percentage
	const [direction, setDirection] = useState<1 | -1>(1); // 1 for right, -1 for left
	const animationFrameId = useRef<number | null>(null);
	const lastTime = useRef<number>(0);
	const barRef = useRef<HTMLDivElement>(null); // Ref to get the actual width of the bar

	// NEW STATE: Tracks if the slider is currently moving
	const [isSliderMoving, setIsSliderMoving] = useState(false);

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
		// If the overall bar is disabled, stop animation and ensure button is disabled
		if (disabled) {
			if (animationFrameId.current) {
				cancelAnimationFrame(animationFrameId.current);
			}
			setIsSliderMoving(false); // Ensure button is disabled
			return;
		}

		// When the component becomes active (not disabled), start the animation
		setIsSliderMoving(true);

		const animate = (currentTime: number) => {
			if (!lastTime.current) lastTime.current = currentTime;
			const deltaTime = currentTime - lastTime.current;
			lastTime.current = currentTime;

			setSliderPosition((prevPos) => {
				let newPos = prevPos + (direction * speed * deltaTime) / 1000;

				const cursorLeftEdge = newPos - cursorHalfWidthInPercent;
				const cursorRightEdge = newPos + cursorHalfWidthInPercent;

				if (cursorRightEdge >= 100) {
					newPos = 100 - cursorHalfWidthInPercent;
					setDirection(-1);
				} else if (cursorLeftEdge <= 0) {
					newPos = cursorHalfWidthInPercent;
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
	}, [direction, speed, cursorHalfWidthInPercent, disabled]); // Add disabled to dependencies

	const handleStopClick = () => {
		if (animationFrameId.current) {
			cancelAnimationFrame(animationFrameId.current); // Stop the animation
			animationFrameId.current = null; // Clear the ref
		}

		// NEW: Set isSliderMoving to false because the slider has stopped
		setIsSliderMoving(false);

		const isWithinGreenZone =
			sliderPosition >= greenZoneStart && sliderPosition <= greenZoneEnd;

		onStop(isWithinGreenZone, sliderPosition);
	};

	return (
		<div
			className={`flex flex-col items-center w-full py-1 ${
				disabled ? 'opacity-50' : ''
			}`}
		>
			<small className="text-white text-xs mb-4 text-center opacity-75">
				Click <span className="text-accent">READY</span> when the bar is
				in the green zone!
			</small>
			<div
				ref={barRef} // Attach the ref here
				className={`w-full h-5 bg-white/35 rounded-md overflow-hidden relative ${
					disabled ? 'mb-2' : 'mb-2.5'
				}`}
			>
				{/* Green Zone (Hit Target) */}
				<div
					className="absolute h-full bg-success/70"
					style={{
						left: `${greenZoneStart}%`,
						width: `${hitTargetWidth}%`,
					}}
				></div>
				{/* Sliding Yellow Bar (Cursor) */}
				<div
					className="absolute h-full bg-yellow-400 rounded-md"
					style={{
						left: `calc(${sliderPosition}% - ${cursorWidth / 2}px)`,
						width: `${cursorWidth}px`,
					}}
				></div>
			</div>
			{!disabled && (
				<PixelButton
					type="button"
					disabled={disabled || !isSliderMoving} // Control button disabled state
					className="py-2 px-8 w-full"
					colors={{
						face: '#facc15',
						shadow: '#ca8a04',
						border: '#a16207',
						text: '#1f2937',
					}}
					onClick={handleStopClick}
				>
					<p>READY</p>
				</PixelButton>
			)}
		</div>
	);
};
