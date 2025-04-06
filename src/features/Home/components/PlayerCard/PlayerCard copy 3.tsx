import { memo } from 'react';
import SpriteSheet from '../../../../components/SpriteSheet'
import { PlayerAvatar } from './PlayerAvatar';
import LevelBadge from './LevelBadge';
import ExperienceBar from './ExperienceBar';
import { Gi3dGlasses, Gi3dMeeple } from 'react-icons/gi';

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
        <div className="flex items-center lg:flex-row lg:justify-around px-3 bg-accent/0 rounded-lg shadow-md" title='Player Card'>
            <div className='flex flex-col  items-center flex-1 min-w-1 h-full gap-3 '>
                <div className='bg-primary/50'>
                    <Gi3dGlasses className='w-7 h-7' title='Glasses: 34'/>
                </div>
                <div>
                    <div className='bg-primary/50'>
                        <Gi3dMeeple className='w-5 h-5'/>
                        <Gi3dMeeple className='w-5 h-5'/>
                        <Gi3dMeeple className='w-5 h-5'/>
                    </div>
                </div>
                
            </div>
            <div className='flex-2 flex-grow'>
                <PlayerAvatar
                    characterAsset={characterAsset}
                    row={row}
                    fps={fps}
                    frameCount={frameCount}
                    currentScreenSize={currentScreenSize}
                    playerTitle={playerTitle}
                    playerName={playerName}
                    onAnimationComplete={onAnimationComplete}
                    onClick={onClick}
                    />
                <div className="flex flex-col items-center lg:items-end space-y-1">
                    <LevelBadge playerTitle={playerName} currentLevel={currentLevel}/>
                    <ExperienceBar currentExp={currentExp} nextLvlExp={nextLvlExp}/>
                </div>
            </div>
            <div className='flex flex-col  items-center flex-1 min-w-1 h-full gap-3'>
                <div className='bg-primary/50'>
                    <Gi3dGlasses className='w-7 h-7'/>
                </div>
                <div>
                    <div className='bg-primary/50'>
                        <Gi3dMeeple className='w-5 h-5'/>
                        <Gi3dMeeple className='w-5 h-5'/>
                        <Gi3dMeeple className='w-5 h-5'/>
                    </div>
                </div>
            </div>
        </div>
        </>
  )
}


export default memo(PlayerCard);