import React, {
	useRef,
	useEffect,
	useCallback,
	memo,
	CSSProperties,
} from 'react';

interface SpriteSheetProps {
	src: string;
	frameWidth: number;
	frameHeight: number;
	frameCount: number;
	fps?: number;
	scale?: number;
	playing?: boolean;
	loop?: boolean;
	frameRow?: number;
	className?: string;
	style?: CSSProperties;
	offsetX?: number;
	offsetY?: number;
	isLoading?: boolean;
	isError?: boolean;
	onComplete?: () => void;
	onAnimationCycleComplete?: () => void;
}

const SpriteSheet: React.FC<SpriteSheetProps> = ({
	src,
	frameWidth,
	frameHeight,
	frameCount,
	fps = 60,
	scale = 1,
	playing = true,
	loop = true,
	frameRow = 0,
	className = '',
	style = {},
	offsetX = 0,
	offsetY = 0,
	isLoading = false,
	isError = false,
	onComplete,
	onAnimationCycleComplete,
}) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const imageRef = useRef<HTMLImageElement | null>(null);
	const frameRef = useRef(0);
	const animationIdRef = useRef<number | null>(null);
	const lastFrameTimeRef = useRef(0);
	const frameIntervalRef = useRef(1000 / fps);

	// Update frame interval when fps changes
	useEffect(() => {
		frameIntervalRef.current = 1000 / fps;
	}, [fps]);

	// Load sprite image with error handling
	useEffect(() => {
		const img = new Image();
		img.src =
			isLoading || isError
				? '/cramquest/assets/images/player/loader.png'
				: src;

		img.onload = () => {
			imageRef.current = img;
			drawFrame(0);
		};

		return () => {
			img.onload = null;
			img.onerror = null;
		};
	}, [src, isLoading, isError]);

	// Memoized draw function to avoid recreation
	const drawFrame = useCallback(
		(frameIndex: number) => {
			const canvas = canvasRef.current;
			const ctx = canvas?.getContext('2d');
			const img = imageRef.current;

			if (!canvas || !ctx || !img) return;

			// Only clear the specific area we're drawing to reduce GPU work
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Disable smoothing for pixel art (already set, but ensuring it's consistent)
			ctx.imageSmoothingEnabled = false;

			const sx = frameIndex * frameWidth + offsetX;
			const sy = frameRow * frameHeight + offsetY;

			ctx.drawImage(
				img,
				sx,
				sy,
				frameWidth,
				frameHeight,
				0,
				0,
				frameWidth * scale,
				frameHeight * scale
			);
		},
		[frameWidth, frameHeight, frameRow, offsetX, offsetY, scale]
	);

	// Optimized animation loop using requestAnimationFrame
	const animate = useCallback(
		(currentTime: number) => {
			const deltaTime = currentTime - lastFrameTimeRef.current;

			if (deltaTime >= frameIntervalRef.current) {
				frameRef.current += 1;

				if (frameRef.current === frameCount - 1) {
					onAnimationCycleComplete?.();
				}

				if (frameRef.current >= frameCount) {
					if (loop) {
						frameRef.current = 0;
					} else {
						frameRef.current = frameCount - 1;
						onComplete?.();
						stop();
						return;
					}
				}

				drawFrame(frameRef.current);
				lastFrameTimeRef.current = currentTime;
			}

			if (playing) {
				animationIdRef.current = requestAnimationFrame(animate);
			}
		},
		[
			frameCount,
			loop,
			onComplete,
			onAnimationCycleComplete,
			playing,
			drawFrame,
		]
	);

	const start = useCallback(() => {
		stop();
		frameRef.current = 0;
		lastFrameTimeRef.current = 0;
		drawFrame(0);
		animationIdRef.current = requestAnimationFrame(animate);
	}, [animate, drawFrame]);

	const stop = useCallback(() => {
		if (animationIdRef.current !== null) {
			cancelAnimationFrame(animationIdRef.current);
			animationIdRef.current = null;
		}
	}, []);

	useEffect(() => {
		if (playing) {
			start();
		} else {
			stop();
		}

		return stop;
	}, [playing, start, stop]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			stop();
			if (imageRef.current) {
				imageRef.current.onload = null;
				imageRef.current.onerror = null;
			}
		};
	}, [stop]);

	return (
		<canvas
			ref={canvasRef}
			width={frameWidth * scale}
			height={frameHeight * scale}
			className={className}
			style={{
				imageRendering: 'pixelated',
				display: 'block',
				willChange: playing ? 'auto' : 'unset', // Hint to browser for optimization
				...style,
			}}
		/>
	);
};

export default memo(SpriteSheet);
