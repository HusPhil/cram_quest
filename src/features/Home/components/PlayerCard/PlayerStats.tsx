import React from 'react'
import ExperienceBar from './ExperienceBar'
import { LevelBadge } from './LevelBadge'

interface PlayerStatsProps {
  currentExp: number;
  nextLvlExp: number;
  currentLevel: number;
}

export default function PlayerStats({
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
            <LevelBadge currentLevel={currentLevel}/>
            <p>{`XP: ${currentExp}/${nextLvlExp}`}</p>
        </span>
        <ExperienceBar currentExp={20913} nextLvlExp={39792} /> 
    </div>
  )
}
