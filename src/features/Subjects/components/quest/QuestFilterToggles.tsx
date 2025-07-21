import QuestFilterToggleButton from './QuestFilterToggleButton';

export default function QuestFilterToggles() {
	return (
		<div className="flex space-x-3">
			<QuestFilterToggleButton title="Todo" filterType="to_do" />
			<QuestFilterToggleButton title="Doing" filterType="doing" />
			<QuestFilterToggleButton title="Done" filterType="done" />
		</div>
	);
}
