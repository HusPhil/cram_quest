import TagLabel from '../../../../../../components/TagLabel';
import { FaPlus } from 'react-icons/fa';
import { QuestRead } from '../../../../../../services/api/schema/quest_schema';

export default function QuestListHeader({
	quests,
}: {
	quests: QuestRead[];
	subjectId: number;
}) {
	return (
		<div className="flex items-center justify-between my-1">
			<span className="flex gap-2">
				<TagLabel className="flex items-center rounded-full px-2">
					<p className="text-xs">All: {quests.length.toString()}</p>
				</TagLabel>
				<TagLabel className="flex items-center rounded-full px-2">
					<p className="text-xs">Doing: 5</p>
				</TagLabel>
				<TagLabel className="flex items-center rounded-full px-2">
					<p className="text-xs">Done: 5</p>
				</TagLabel>
			</span>
			<span className="flex text-sm items-center bg-accent text-white  py-1 rounded-md px-3">
				<button
					className="flex items-center gap-1 text-xs"
					onClick={() => console.log('Add new quest')}
				>
					Add <FaPlus className="w-3 h-3" />
				</button>
			</span>
		</div>
	);
}
