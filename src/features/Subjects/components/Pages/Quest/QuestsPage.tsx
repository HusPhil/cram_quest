import React from 'react'
import QuestListHeader from './QuestListHeader'
import QuestList from './QuestList'
const mockQuests = [
  {
    id: 1,
    difficulty: 1,
    description: 'Study calculus',
    deadline: "2023-01-01",
  },
  {
    id: 2,
    difficulty: 2,
    description: 'Read physics book',
    deadline: "2023-01-02",
  },
  {
    id: 3,
    difficulty: 3,
    description: 'Complete chemistry assignment',
    deadline: "2023-01-03",
  },
  {
    id: 4,
    difficulty: 1,
    description: 'Practice algebra',
    deadline: "2023-01-04",
  },
  {
    id: 5,
    difficulty: 2,
    description: 'Write essay on biology',
    deadline: "2023-01-05",
  },
  {
    id: 6,
    difficulty: 3,
    description: 'Prepare for history presentation',
    deadline: "2023-01-06",
  },
  {
    id: 7,
    difficulty: 1,
    description: 'Revise geography notes',
    deadline: "2023-01-07",
  },
  {
    id: 8,
    difficulty: 2,
    description: 'Solve math problems',
    deadline: "2023-01-08",
  },
  {
    id: 9,
    difficulty: 3,
    description: 'Research on computer science project',
    deadline: "2023-01-09",
  },
  {
    id: 10,
    difficulty: 1,
    description: 'Read English literature',
    deadline: "2023-01-10",
  },
  {
    id: 11,
    difficulty: 2,
    description: 'Practice musical instrument',
    deadline: "2023-01-11",
  }
]

export type Quest = {
  id: number,
  difficulty: number,
  description: string,
  deadline: string
}

export default function QuestsPage() {
  return (
    <div className='flex flex-1 h-full flex-col'>
      <div className='shrink-0'>
        <QuestListHeader/>
      </div>

      <div className='flex-1 min-h-0 overflow-auto space-y-2 mt-4 no-scrollbar'>
        <QuestList quests={mockQuests}/>
      </div>
    </div>
  )
}
