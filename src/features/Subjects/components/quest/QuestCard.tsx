import {
	QuestRead,
	QuestStatus,
} from '../../../../services/api/schema/quest_schema';
import { timeAgo } from '../../../../utils/timeAgo';
import StarRating from '../ui/StarRating';
import { useSubjectStore_UI } from '../../stores/subjectStore_UI';

interface QuestCardProps {
	quest: QuestRead;
}

export default function QuestCard({ quest }: QuestCardProps) {
	const setActiveModal = useSubjectStore_UI((state) => state.setActiveModal);

	const statusStyle = (status: QuestStatus): string => {
		const baseStyles =
			'bg-background/50  text-xs capitalize py-1 px-2 rounded-md ';

		let statusStyles = '';

		if (status === 'todo') statusStyles = 'border-white/10 ';
		if (status === 'done') statusStyles = ' text-success';
		if (status === 'archive') statusStyles = 'text-danger';
		if (status === 'doing') statusStyles = 'text-accent';

		return statusStyles + ' ' + baseStyles;
	};

	return (
		<div
			onClick={() => setActiveModal('ViewQuestModal', quest)}
			className={`bg-secondary border-white/10 border rounded-lg py-2 px-3 fade-in-on-view lg:hover:opacity-50 active:scale-95 transition-all duration-300 hover:cursor-pointer`}
		>
			<div className="flex justify-between items-start ">
				<div className="w-full">
					<div className="flex gap-2 justify-between w-full">
						<div className="flex gap-2">
							<p className={statusStyle(quest.status)}>
								{quest.status}
							</p>
							<StarRating
								value={quest.difficulty}
								starClassName="w-3.5 h-3.5"
							/>
						</div>
						<small className="text-text/50 text-xs px-1 py-1">
							{timeAgo(quest.created_at)}
						</small>
					</div>
					<p className="text-base m-2">{quest.description}</p>
				</div>
			</div>
		</div>
	);
}
