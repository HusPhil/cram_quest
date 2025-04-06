
import { memo } from 'react';
import SpriteSheet from '../../../../components/SpriteSheet';
import RankTitle from '../../../../components/RankTitle';

interface PlayerAvatarProps {
    characterAsset: string;
    row: number;
    fps: number;
    frameCount: number;
    currentScreenSize: string;
    playerTitle: String;
    playerName: String;
    onAnimationComplete?: () => void;
    onClick?: () => void;
}

export function PlayerAvatar({
    characterAsset,
    row,
    fps,
    frameCount,
    currentScreenSize,
    playerTitle,
    playerName,
    onAnimationComplete,
    onClick,
}: PlayerAvatarProps) {
  return (
    <div className='flex items-center lg:items-start'>
        <div className="relative transform hover:scale-105 transition-transform duration-200">
            <div className="absolute inset-3 bg-accent/10 blur-xl"></div>
            <div onClick={onClick}>
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
        </div>
    </div>
  )
}


export default memo(PlayerAvatar)