import QuestCard from './QuestCard';
import { QuestRead } from '../../../../services/api/schema/quest_schema';
import EmptyListNote from '../../../../components/EmptyListNote';

interface QuestListProps {
	quests: QuestRead[];
}

export default function QuestList({ quests }: QuestListProps) {
	return (
		<>
			{quests.length > 0 ? (
				quests.map((quest) => (
					<QuestCard key={quest.id} quest={quest} />
				))
			) : (
				<EmptyListNote
					message="No quests found"
					hint="Add a new quest"
					className="text-xl"
				/>
			)}
		</>
	);
}
