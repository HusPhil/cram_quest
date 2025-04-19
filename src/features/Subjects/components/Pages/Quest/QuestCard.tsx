import { FaEllipsisV } from 'react-icons/fa';
import { Quest } from './QuestsPage';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { GiRoundStar } from 'react-icons/gi';

interface QuestCardProps {
	quest: Quest;
}

export default function QuestCard({ quest }: QuestCardProps) {
	return (
		<div className="bg-secondary rounded-lg pt-3 pb-1 px-3 fade-in-on-view">
			<div className="flex justify-between">
				<div className="flex gap-3 items-start">
					<input
						type="checkbox"
						className="appearance-none shrink-0 w-4 h-4 rounded-sm accent-accent 
                      bg-secondary checked:appearance-auto border border-accent mt-1"
					/>
					<p>{quest.description}</p>
				</div>
				<FaEllipsisVertical />
			</div>

			<hr className="flex-1 mt-2 border-text/50" />

			<div>
				<div className="flex gap-2 items-center">
					{[...Array(quest.difficulty)].map((_, i) => (
						<GiRoundStar className="w-3 h-3 text-accent" />
					))}
					<p className="text-xl">•</p>
					<small className="text-xs">{quest.deadline}</small>
				</div>
			</div>
		</div>
	);
}
