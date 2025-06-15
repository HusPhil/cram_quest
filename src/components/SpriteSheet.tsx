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
	fps = 10,
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
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// Load sprite image
	useEffect(() => {
		const img = new Image();
		img.src =
			isLoading || isError
				? '/cramquest/assets/images/player/loader.png'
				: src;
		img.onload = () => {
			imageRef.current = img;
			drawFrame(0); // draw first frame
		};
	}, [src, isLoading, isError]);

	const drawFrame = (frameIndex: number) => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext('2d');
		const img = imageRef.current;

		if (!canvas || !ctx || !img) return;

		// Clear canvas before drawing
		ctx.clearRect(0, 0, canvas.width, canvas.height);

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
	};

	// Animation loop
	const animate = useCallback(() => {
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
	}, [frameCount, loop, onComplete, onAnimationCycleComplete]);

	const start = useCallback(() => {
		stop();
		frameRef.current = 0;
		drawFrame(0);
		intervalRef.current = setInterval(() => {
			animate();
		}, 1000 / fps);
	}, [fps, animate]);

	const stop = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	useEffect(() => {
		if (playing) start();
		else stop();
		return () => stop();
	}, [playing, start]);

	return (
		<canvas
			ref={canvasRef}
			width={frameWidth * scale}
			height={frameHeight * scale}
			className={className}
			style={{
				imageRendering: 'pixelated',
				display: 'block',
				...style,
			}}
		/>
	);
};

export default memo(SpriteSheet);
