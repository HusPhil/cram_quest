import { FaPlus } from 'react-icons/fa';
import { QuestRead } from '../../../../services/api/schema/quest_schema';
import { useSubjectStore_UI } from '../../stores/subjectStore_UI';
import QuestFilterToggles from './QuestFilterToggles';

export default function QuestListHeader({}: {
	quests: QuestRead[];
	subjectId: number;
}) {
	const setActiveModal = useSubjectStore_UI((state) => state.setActiveModal);

	return (
		<div className="flex items-center justify-between py-5">
			<span className="flex gap-2">
				<QuestFilterToggles />
			</span>
			<button
				className="flex items-center gap-1 py-1 px-3 bg-accent text-background border-accent border rounded-md active:scale-95 transition-transform"
				onClick={() => setActiveModal('AddNewQuestModal')}
			>
				<FaPlus className="w-3 h-3" />
				<p className="text-sm">Add</p>
			</button>
		</div>
	);
}
