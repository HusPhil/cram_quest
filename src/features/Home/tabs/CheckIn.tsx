import { useEffect } from 'react'
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
    const { getAnimationParams: getPlayerAnimationParams } = useCharacterAnimation("player", 'default', "default_2")
  
    useEffect(() => {
      console.log("Quests re rendered")
    }, [])
  
    return (
      <div className='flex flex-col items-center flex-1 px-4'>
          {/* Character Card */}
          <RpgCard hoverable={false} className='w-full md:max-w-[50%] '>
            <PlayerCard
              characterAsset={getPlayerAnimationParams().characterAsset}
              row={getPlayerAnimationParams().row}
              fps={getPlayerAnimationParams().fps}
              frameCount={getPlayerAnimationParams().frameCount}
              currentScreenSize={currentScreenSize} 
              currentExp={213}
              nextLvlExp={3192}
              playerTitle={"MONARCH"}
              playerName={"HashWarrior"}
              currentLevel={100}
              />
          </RpgCard>

          <div className='mt-10 overflow-auto'>
            <WeeklyRecord weeklyCheckInRecord={mockWeeklyCheckInRecord} />
          </div>

          <p className="mt-4 text-text text-center text-xs">
            Check in every day to earn weekly rewards!
          </p>

      </div>
    )
}
