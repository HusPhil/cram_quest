import { memo } from 'react';
import RankTitle from '../../../../components/RankTitle';
import PlayerSummary from './PlayerSummary';
import PlayerStats from './PlayerStats';

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
        <div className="flex items-center flex-col lg:flex-row lg:justify-around px-3 bg-accent/0 rounded-lg shadow-md" title='Player Card'>
            
            <div className='flex-1 w-full'>
                <RankTitle text={playerTitle} color='bronze'/>
            </div>
            <div className='flex-2 flex-grow w-full'>
                <PlayerSummary
                    characterAsset={characterAsset}
                    row={row}
                    fps={fps}
                    frameCount={frameCount}
                    currentScreenSize={currentScreenSize}
                    onAnimationComplete={onAnimationComplete}
                    onClick={onClick}
                    />
            </div>
            <div className='flex-1 w-full'>
                <PlayerStats
                    currentExp={currentExp}
                    nextLvlExp={nextLvlExp}
                    currentLevel={currentLevel}
                    />
            </div>

            
        </div>
        </>
  )
}


export default memo(PlayerCard);


// <div className='flex flex-col  items-center flex-1 min-w-1 h-full gap-3 '>
//                 <div className='bg-primary/50'>
//                     <Gi3dGlasses className='w-7 h-7' title='Glasses: 34'/>
//                 </div>
//                 <div>
//                     <div className='bg-primary/50'>
//                         <Gi3dMeeple className='w-5 h-5'/>
//                         <Gi3dMeeple className='w-5 h-5'/>
//                         <Gi3dMeeple className='w-5 h-5'/>
//                     </div>
//                 </div>
                
//             </div>