import React from 'react';
import QuestListHeader from './QuestListHeader';
import QuestList from './QuestList';

export type Quest = {
	id: number;
	difficulty: number;
	description: string;
	deadline: string;
};

const mockQuests: Quest[] = Array(10)
	.fill({})
	.map(
		(_, i) =>
			({
				id: i,
				difficulty: Math.floor(Math.random() * 5),
				description: 'kinemerut: ' + i,
				deadline: '2025-12-2' + i,
			} as Quest)
	);

export default function QuestsPage({ subjectId }: { subjectId: number }) {
	return (
		<div className="flex flex-1 h-full flex-col">
			<div className="shrink-0">
				<QuestListHeader quests={mockQuests} subjectId={subjectId} />
			</div>

			<div className="flex-1 min-h-0 overflow-auto space-y-4 mt-4 no-scrollbar">
				<QuestList quests={mockQuests} />
			</div>
		</div>
	);
}
