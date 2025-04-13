import { useCallback, useEffect } from 'react'
import useCharacterAnimation from '../../Battle/hooks/useCharacterAnimation'
import useScreenResize from '../../../hooks/useScreenResize';
import PlayerCard from '../../CheckIn/components/PlayerCard/PlayerCard';
import WeeklyRecord from '../../CheckIn/components/WeeklyRecord.tsx/WeeklyRecord';
import RpgCard from '../../../components/RpgCard';
import RankParticles from '../../../components/RankParticle';

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
    const {currentScreenSize, currentHeightSize} = useScreenResize();
    const { getAnimationParams: getPlayerAnimationParams, setCurrentAction, currentAction } = useCharacterAnimation("player", 'default', "default_3")
    
    const handlePlayerClick = useCallback(() => {
      if(currentAction == "hurt") return
      setCurrentAction("hurt")
    }, [currentAction, setCurrentAction])
  
    const handleAnimationComplete = useCallback(() => {
      if(currentAction == "attack_2") return
      setCurrentAction("attack_2")
    }, [currentAction, setCurrentAction])
    

    return (
      <div className='flex flex-col items-center justify-end flex-1 mx-4'>
          {/* Character Card */}
          {true ? (
            <RpgCard hoverable={false} className='w-full mb-2 py-5 max-w-sm md:max-w-xl lg:max-w-2xl lg:mb-5'>
              <PlayerCard
                characterAsset={getPlayerAnimationParams().characterAsset}
                row={getPlayerAnimationParams().row}
                fps={getPlayerAnimationParams().fps}
                frameCount={getPlayerAnimationParams().frameCount}
                currentScreenSize={currentScreenSize} 
                currentExp={20913}
                nextLvlExp={39792}
                playerTitle={"Noobie"}
                playerName={"CacheWarrior"}
                currentLevel={100}
                onClick={handlePlayerClick}
                onAnimationComplete={handleAnimationComplete}
                />
            </RpgCard>
          ) : (
            <div>maliit screen height saka na ayusin</div>
          )}

          <div className='mx-3'>
            <WeeklyRecord weeklyCheckInRecord={mockWeeklyCheckInRecord} />
          </div>


      </div>
    )
}
