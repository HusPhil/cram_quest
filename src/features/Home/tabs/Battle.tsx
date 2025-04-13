import { useEffect } from 'react'
import BattleArena from '../../Battle/components/BattleArena'
import SelectedQuestList from '../../Battle/components/SelectedQuestList'

export default function Battle() {

  useEffect(() => {
    console.log("Battle re rendered")
  }, [])

  return (
    <div>
      <div>
        <BattleArena />
      </div>
      <div>
        {/* <SelectedQuestList/> */}
      </div>
    </div>
  )
}
