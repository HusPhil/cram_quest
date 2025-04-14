import { useEffect } from 'react'
import BattleArena from '../../Battle/components/BattleArena'
import SelectedQuestList from '../../Battle/components/SelectedQuestList'

export default function Battle() {

  useEffect(() => {
    console.log("Battle re rendered")
  }, [])

  return (
    <div className='h-[75dvh] w-full flex justify-center'>
      <div className='flex flex-col h-full items-center  w-full'>
        <div className='shrink-0'>
          <BattleArena />
        </div>
        {/* <div className="space-y-2 p-4 bg-gray-800/50 rounded-lg">
          <h3 className="font-semibold mb-4 ">Battle Goals</h3>
        </div> */}
        <div className='flex-1 min-h-0 overflow-auto bg-gray-800/0 p-5 space-y-2 mt-4 w-full no-scrollbar'>
          <SelectedQuestList/>  
        </div>
      </div>
    </div>
  )
}
