import { GiRoundStar } from 'react-icons/gi';
import { Quest } from '../../Subjects/components/Pages/Quest/QuestsPage';

interface SelectedQuestCardProps {
	quest: Quest;
}

export default function SelectedQuestCard({ quest }: SelectedQuestCardProps) {
	return (
		<div className="bg-secondary rounded-lg pt-3 pb-1 px-3 w-full">
			<div className="flex justify-between">
				<div className="flex gap-3 items-start">
					<input
						type="checkbox"
						className="appearance-none shrink-0 w-4 h-4 rounded-sm accent-accent 
                                bg-secondary checked:appearance-auto border border-accent mt-1"
					/>
					<p>{quest.description}</p>
				</div>
			</div>

			<hr className="flex-1 mt-2 border-text/50" />

			<div>
				<div className="flex gap-2 items-center">
					{[...Array(quest.difficulty)].map((_, i) => (
						<GiRoundStar className="w-3 h-3 text-accent" />
					))}
					<small className="text-xs my-4">{quest.deadline}</small>
				</div>
			</div>
		</div>
	);
}
