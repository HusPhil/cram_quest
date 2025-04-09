import { memo } from 'react';
import SpriteSheet from '../../../components/SpriteSheet';
import StatCard from '../../../components/StatCard';

interface PlayerSummaryProps {
    characterAsset: string;
    row: number;
    fps: number;
    frameCount: number;
    currentScreenSize: string;
    onAnimationComplete?: () => void;
    onClick?: () => void;
}

export function PlayerSummary({
    characterAsset,
    row,
    fps,
    frameCount,
    currentScreenSize,
    onAnimationComplete,
    onClick,
}: PlayerSummaryProps) {
  return (
    <div className='flex justify-between items-center flex-1 w-full'>
        <div className='flex flex-1 w-full items-center justify-end md:justify-center'>
            <StatCard label={"Best Streak"} value={0}/>
        </div>
        <div className='flex flex-col justify-center items-center mx-3' onClick={onClick}>
        <SpriteSheet
            src={characterAsset}
            frameRow={row}
            fps={fps}
            frameCount={frameCount}
            frameWidth={48}
            frameHeight={48}
            onAnimationCycleComplete={onAnimationComplete}
            scale={currentScreenSize !== "LARGE" ? 2 : 2.3}
            />
        </div>
        <div className='flex flex-1 w-full items-center justify-start md:justify-center'>
            <StatCard label={"Battles Won"} value={0}/>
        </div>
    </div>
  )
}


export default memo(PlayerSummary);