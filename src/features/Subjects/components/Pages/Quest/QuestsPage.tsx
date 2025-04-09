import React from 'react'
import QuestListHeader from './QuestListHeader'
import QuestList from './QuestList'

export default function QuestsPage() {
  return (
    <div className='flex flex-1 h-full flex-col'>
      <div className='shrink-0'>
        <QuestListHeader/>
      </div>

      <div className='flex-1'>
        <QuestList />
      </div>
    </div>
  )
}
