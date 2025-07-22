import { TbChecks } from 'react-icons/tb';
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
	const baseStyles = 'py-1 px-3 rounded-md flex items-center gap-1 ';
	const toggledStyles = toggled
		? 'bg-accent text-background border border-accent'
		: 'opacity-35 border';

	return (
		<button
			className={baseStyles + toggledStyles}
			onClick={() => toggleQuestFilter(filterType)}
		>
			<p className={`${toggled ? 'text-xs py-0.5' : 'text-sm'}`}>
				{title}
			</p>
			{toggled && <TbChecks />}
		</button>
	);
}
