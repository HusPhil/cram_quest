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
	.map((_, i) => ({} as Quest));

export default function QuestsPage() {
	return (
		<div className="flex flex-1 h-full flex-col">
			<div className="shrink-0">
				<QuestListHeader quests={mockQuests} />
			</div>

			<div className="flex-1 min-h-0 overflow-auto space-y-2 mt-4 no-scrollbar">
				<QuestList quests={mockQuests} />
			</div>
		</div>
	);
}
