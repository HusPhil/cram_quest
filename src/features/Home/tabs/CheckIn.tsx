import { useCallback, useEffect } from 'react'
import useCharacterAnimation from '../../Battle/hooks/useCharacterAnimation'
import useScreenResize from '../../../hooks/useScreenResize';
import PlayerCard from '../components/PlayerCard/PlayerCard';
import WeeklyRecord from '../components/WeeklyRecord.tsx/WeeklyRecord';
import RpgCard from '../../../components/RpgCard';

const mockWeeklyCheckInRecord = [
  {
    day: "Monday",
    date: "2025-04-01",
    checkIn: true
  },
  {
    day: "Tuesday",
    date: "2025-04-02",
    checkIn: true,
  },
  {
    day: "Wednesday",
    date: "2025-04-03",
    checkIn: true
  },
  {
    day: "Thursday",
    date: "2025-04-04",
    checkIn: false
  },
  {
    day: "Friday",
    date: "2025-04-05",
    checkIn: true
  },
  {
    day: "Saturday",
    date: "2025-04-06",
    checkIn: false
  },
  {
    day: "Sunday",
    date: "2025-04-07",
    checkIn: true
  }
];

export default function CheckIn() {
    const currentScreenSize = useScreenResize();
    const { getAnimationParams: getPlayerAnimationParams, setCurrentAction, currentAction } = useCharacterAnimation("player", 'default', "default_3")
  
    const handlePlayerClick = useCallback(() => {
      if(currentAction == "hurt") return
      setCurrentAction("hurt")
    }, [currentAction, setCurrentAction])
  
    const handleAnimationComplete = useCallback(() => {
      if(currentAction == "idle") return
      setCurrentAction("idle")
    }, [currentAction, setCurrentAction])
  
    return (
      <div className='flex flex-col items-center justify-between flex-1'>
          {/* Character Card */}
          <RpgCard hoverable={false} className='w-[90%] md:max-w-2xl'>
            <PlayerCard
              characterAsset={getPlayerAnimationParams().characterAsset}
              row={getPlayerAnimationParams().row}
              fps={getPlayerAnimationParams().fps}
              frameCount={getPlayerAnimationParams().frameCount}
              currentScreenSize={currentScreenSize} 
              currentExp={213}
              nextLvlExp={392}
              playerTitle={"Noobie"}
              playerName={"HashWarrior"}
              currentLevel={1}
              onClick={handlePlayerClick}
              onAnimationComplete={handleAnimationComplete}
              />
          </RpgCard>

          <div className='mt-8 mx-3'>
            <WeeklyRecord weeklyCheckInRecord={mockWeeklyCheckInRecord} />
          </div>


      </div>
    )
}
