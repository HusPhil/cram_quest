import { useQueryClient } from '@tanstack/react-query';
import QuestCard from './QuestCard';
import { useDeleteQuest } from '../../../hooks/useDeleteQuest';
import { QuestRead } from '../../../../../services/api/schema/quest_schema';
import { toast } from 'react-toastify';

interface QuestListProps {
	quests: QuestRead[];
}

export default function QuestList({ quests }: QuestListProps) {
	return (
		<>
			{quests.map((quest: QuestRead) => (
				<QuestCard key={quest.id} quest={quest} />
			))}
		</>
	);
}
