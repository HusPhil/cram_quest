import {
	QuestRead,
	QuestStatus,
} from '../../../../services/api/schema/quest_schema';
import { useQueryClient } from '@tanstack/react-query';
import { formatIsoDate } from '../../../../utils/formatISODate';
import { timeAgo } from '../../../../utils/timeAgo';
import StarRating from '../ui/StarRating';

interface QuestCardProps {
	quest: QuestRead;
}

export default function QuestCard({ quest }: QuestCardProps) {
	const queryClient = useQueryClient();

	const SUBJECT_QUESTS_QUERY_KEY = ['subjects', quest.subject_id, 'quests'];

	const statusStyle = (status: QuestStatus) => {};

	return (
		<div
			className={`bg-secondary border-white/10 border rounded-lg pt-3 pb-1 px-3 fade-in-on-view`}
		>
			<div className="flex justify-between items-start ">
				<div className="flex ">
					<p>{quest.status}</p>
					<StarRating value={quest.difficulty} />
				</div>
			</div>
		</div>
	);
}
