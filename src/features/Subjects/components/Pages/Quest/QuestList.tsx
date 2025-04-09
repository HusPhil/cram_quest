import QuestCard from "./QuestCard"
import { Quest } from "./QuestsPage"

interface QuestListProps {
  quests: Quest[]
}

export default function QuestList({ quests }: QuestListProps) {
  return (
    <>
    {quests.map((quest: Quest) => (
      <QuestCard key={quest.id} quest={quest}/>
    ))}
    </>
  )
}
