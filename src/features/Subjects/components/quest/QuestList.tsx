import QuestCard from './QuestCard';
import { QuestRead } from '../../../../services/api/schema/quest_schema';
import EmptyListNote from '../../../../components/EmptyListNote';
import { useSubjectStore_UI } from '../../stores/subjectStore_UI';
import { useEffect } from 'react';

interface QuestListProps {
	quests: QuestRead[];
}

export default function QuestList({ quests }: QuestListProps) {
	const questFilters = useSubjectStore_UI((state) => state.questFilters);

	const setQuestFilters = useSubjectStore_UI(
		(state) => state.setQuestFilters
	);

	const filteredQuests = quests.filter((quest) =>
		questFilters.includes(quest.status)
	);

	useEffect(() => {
		return () => {
			setQuestFilters('todo');
		};
	}, []);
	return (
		<>
			{filteredQuests.length > 0 ? (
				<div className="space-y-3 mt-3">
					{filteredQuests.map((quest) => (
						<QuestCard key={quest.id} quest={quest} />
					))}
				</div>
			) : (
				<div className="flex items-center justify-center h-full">
					<EmptyListNote
						message="No quests found,"
						hint="Add a new quest!"
						className="text-xl "
					/>
				</div>
			)}
		</>
	);
}
