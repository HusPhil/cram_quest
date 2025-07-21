import { QuestStatus } from '../../../../services/api/schema/quest_schema';
import { useSubjectStore_UI } from '../../stores/subjectStore_UI';

interface QuestFilterToggleButton {
	title: string;
	filterType: QuestStatus;
}

export default function QuestFilterToggleButton({
	title,
	filterType,
}: QuestFilterToggleButton) {
	const toggled = useSubjectStore_UI((state) =>
		state.questFilters.includes(filterType)
	);
	const toggleQuestFilter = useSubjectStore_UI(
		(state) => state.toggleQuestFilter
	);
	const baseStyles =
		'py-1 px-3 bg-accent/15 border-accent border rounded-md ';
	const toggledStyles = toggled ? '' : 'opacity-50';

	return (
		<button
			className={baseStyles + toggledStyles}
			onClick={() => toggleQuestFilter(filterType)}
		>
			<p className="text-sm">{title}</p>
		</button>
	);
}
