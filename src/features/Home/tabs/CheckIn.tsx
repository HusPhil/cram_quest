import { useEffect } from 'react'
import useCharacterAnimation from '../../Battle/hooks/useCharacterAnimation'
import useScreenResize from '../../../hooks/useScreenResize';
import SpriteSheet from '../../../components/SpriteSheet';
import PlayerCard from '../components/PlayerCard/PlayerCard';
import WeeklyRecord from '../components/WeeklyRecord.tsx/WeeklyRecord';

const mockWeeklyCheckInRecord = [
  {
    day: "Monday",
    date: "2025-04-01",
    checkIn: true
  },
  {
    day: "Tuesday",
    date: "2025-04-02",
    checkIn: true
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
    const { getAnimationParams: getPlayerAnimationParams } = useCharacterAnimation("player", 'knight', "knight_1")
  
    useEffect(() => {
      console.log("Quests re rendered")
    }, [])
  
    return (
      <div className='min-h-screen p-4 bg-gradient-to-b from-gray-900 to-gray-800'>
        <div className='max-w-4xl mx-auto space-y-8'>
          {/* Character Card */}
          <PlayerCard
            characterAsset={getPlayerAnimationParams().characterAsset}
            row={getPlayerAnimationParams().row}
            fps={getPlayerAnimationParams().fps}
            frameCount={getPlayerAnimationParams().frameCount}
            currentScreenSize={currentScreenSize}
            />

          {/* Weekly Check-in Calendar */}
            <WeeklyRecord weeklyCheckInRecord={mockWeeklyCheckInRecord} />
        </div>
      </div>
    )
}
