import ExperienceBar from './ExperienceBar'
import TagLabel from '../../../../components/TagLabel';
import { memo } from 'react';

interface PlayerStatsProps {
  currentExp: number;
  nextLvlExp: number;
  currentLevel: number;
}

export function PlayerStats({
  currentExp,
  nextLvlExp,
  currentLevel,
}: PlayerStatsProps
) {
  return (
    <div className='space-y-2'>
        <p className='w-full text-center'>CacheWarrior</p>
        <span className="flex items-center justify-between text-xs ">
            {/* <span className="flex gap-2">
                <p>{`CacheWarrior`}</p>
                <LevelBadge currentLevel={1} playerTitle={""}/>    
            </span> */}
            <TagLabel info={`Lv. ${currentLevel}`}/>
            <p>{`XP: ${currentExp}/${nextLvlExp}`}</p>
        </span>
        <ExperienceBar currentExp={20913} nextLvlExp={39792} /> 
    </div>
  )
}

export default memo(PlayerStats);