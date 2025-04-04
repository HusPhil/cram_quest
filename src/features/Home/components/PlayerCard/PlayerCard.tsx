import { memo } from 'react';
import SpriteSheet from '../../../../components/SpriteSheet'

interface PlayerCardProps {
    characterAsset: string;
    row: number;
    fps: number;
    frameCount: number;
    currentScreenSize: string;
    playerTitle: String;
    playerName: String;
    currentExp: number;
    nextLvlExp: number;
    currentLevel: number;
    onAnimationComplete?: () => void;
    onClick?: () => void;

}

export function PlayerCard({
    characterAsset,
    row,
    fps,
    frameCount,
    currentScreenSize,
    playerTitle,
    playerName,
    currentExp,
    nextLvlExp,
    currentLevel,
    onAnimationComplete,
    onClick,
}: PlayerCardProps) {
  return (
        <>
        <div className="flex flex-col items-center lg:flex-row lg:justify-around">
            {/* Character Sprite Container */}
            <div className='flex flex-col items-center lg:items-start'>
                <h2 className="text-2xl text-center font-bold text-text tracking-wide lg:text-start">{playerName}</h2>
                <div className="text-center hidden lg:block lg:text-start">
                    <span className="text-sm text-accent/80">{playerTitle}</span>
                </div>
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
                            scale={3}
                        />
                    </div>
                </div>
            </div>

            {/* Character Stats */}
            <div className="flex flex-col items-center lg:items-end space-y-2">
                {/* Level Badge */}
                <div className="flex items-center gap-2 flex-col ">
                    <div className="relative lg:mb-2 ">
                        <div className="absolute inset-0 bg-accent/20 blur-sm rounded-full"></div>
                        <span className="relative px-4 py-1.5 text-sm font-medium bg-accent/10 text-text rounded-full border border-accent/20">
                            Lvl. {currentLevel}
                        </span>
                    </div>
                    <div className="mb-2 text-center lg:hidden">
                        <span className="text-sm text-accent/80">{playerTitle}</span>
                    </div>
                </div>

                {/* XP Progress */}
                <div className="w-full space-y-2">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-text/80">Experience</span>
                        <span className="text-accent font-medium">{currentExp}/{nextLvlExp}</span>
                    </div>
                    <div className="relative h-2.5">
                        {/* Background Bar */}
                        <div className="absolute inset-0 bg-gray-700/50 rounded-full"></div>
                        {/* Progress Bar */}
                        <div 
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent via-accent/80 to-accent/60 rounded-full transition-all duration-300"
                            style={{ width: `${(currentExp/nextLvlExp) * 100}%` }}
                        >
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-accent/20 blur-md"></div>
                        </div>
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full"></div>
                    </div>
                    {/* Next Level Preview */}
                    <div className="text-[10px] text-text/60 text-center lg:text-right">
                        Next Level: {nextLvlExp - currentExp} XP remaining
                    </div>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-2 gap-3 w-full mt-2">
                    <div className="text-center px-3 py-2 rounded-lg bg-gray-800/30 border border-accent/10">
                        <div className="text-[10px] text-text/60">Current Streak</div>
                        <div className="text-accent font-medium">3</div>
                    </div>
                    <div className="text-center px-3 py-2 rounded-lg bg-gray-800/30 border border-accent/10">
                        <div className="text-[10px] text-text/60">Longest Streak</div>
                        <div className="text-accent font-medium">7</div>
                    </div>
                </div>
            </div>
        </div>
        </>
  )
}


export default memo(PlayerCard);