import { useEffect } from 'react'
import BattleArena from '../../Battle/components/BattleArena'
import SelectedQuestList from '../../Battle/components/SelectedQuestList'

export default function Battle() {

  useEffect(() => {
    console.log("Battle re rendered")
  }, [])

  return (
    <div className='flex flex-col justify-start'>
      <div className='shrink-0'>
        <BattleArena />
      </div>
      <div>
        <SelectedQuestList/>
        <SelectedQuestList/>
        <SelectedQuestList/>
        <SelectedQuestList/>
      </div>
    </div>
  )
}
