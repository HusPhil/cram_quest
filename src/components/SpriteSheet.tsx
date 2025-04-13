import React, { useState, useEffect, useRef, useCallback, memo, CSSProperties } from 'react';
import { AnimationConfig } from '../features/Battle/configs/spritesheetConfig';

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
  style?: CSSProperties
  offsetX?: number;
  offsetY?: number;
  animationConfig?: AnimationConfig;
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
  style={},
  offsetX = 0,
  offsetY = 0,
  onComplete,
  onAnimationCycleComplete,
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Reset animation when key props change
  useEffect(() => {
    setCurrentFrame(0);
  }, [src, frameRow]);

  // Handle frame updates
  const updateFrame = useCallback(() => {
    setCurrentFrame(prev => {
      if (prev === frameCount - 2) {
        onAnimationCycleComplete?.();
      }
      if (prev >= frameCount - 1) {
        if (loop) {
          return 0;
        } else {
          onComplete?.();
          return prev;
        }
      }
      return prev + 1;
    });
  }, [frameCount, loop, onComplete, onAnimationCycleComplete]);

  // Handle animation
  useEffect(() => {
    if (!playing) return;

    const interval = setInterval(updateFrame, 1000 / fps);
    return () => clearInterval(interval);
  }, [playing, fps, updateFrame]);

  // Calculate the correct position, now including offsets
  const posX = -(currentFrame * frameWidth);
  const posY = -(frameRow * frameHeight);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: frameWidth * scale,
        height: frameHeight * scale,
        overflow: 'hidden',
        position: 'relative',
        imageRendering: 'pixelated',
        ...style
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt="Sprite"
        style={{
          position: 'absolute',
          left: (posX * scale) + (offsetX * scale),
          top: (posY * scale) + (offsetY * scale),
          width: 'auto',
          height: 'auto',
          maxWidth: 'none',
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
        }}
      />
    </div>
  );
};

export default memo(SpriteSheet);
