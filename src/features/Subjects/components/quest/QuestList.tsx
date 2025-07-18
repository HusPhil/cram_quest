import QuestCard from './QuestCard';
import { QuestRead } from '../../../../services/api/schema/quest_schema';

interface QuestListProps {
	quests: QuestRead[];
}

const EmptyQuestList = () => (
	<div className="text-center text-xl h-full flex items-center justify-center italic">
		<span>
			No quests available,
			<br /> Start your journey!
		</span>
	</div>
);

export default function QuestList({ quests }: QuestListProps) {
	return (
		<>
			{quests.length > 0 ? (
				quests.map((quest) => (
					<QuestCard key={quest.id} quest={quest} />
				))
			) : (
				<EmptyQuestList />
			)}
		</>
	);
}
