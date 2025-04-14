import React, { memo } from 'react'
import SelectedQuestCard from '../../Quests/components/SelectedQuestCard'
import { Quest } from '../../Subjects/components/Pages/Quest/QuestsPage'



const mockSelectedQuests: Quest[] = [
  {
    id: 1,
    description: 'Study React Hooks',
    difficulty: 2,
    deadline: ""
  },
  {
    id: 2,
    description: 'Complete TypeScript Tutorial',
    difficulty: 2,
    deadline: ""
  },
  {
    id: 3,
    description: 'Practice CSS Grid',
    difficulty: 2,
    deadline: ""
  },
  {
    id: 4,
    description: 'Learn Redux',
    difficulty: 3,
    deadline: ""
    },
    {
      id: 5,
      description: 'Build a Portfolio Website',
      difficulty: 4,
      deadline: ""
    },
]


export const SelectedQuestList = () => {
  return (
    <>
      {mockSelectedQuests.map(quest => (
        <SelectedQuestCard key={quest.id} quest={quest} />
      ))}
    </>
  )
}


export default memo(SelectedQuestList)