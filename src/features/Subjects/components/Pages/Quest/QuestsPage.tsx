import React from 'react';
import QuestListHeader from './QuestListHeader';
import QuestList from './QuestList';
import { useGetSubjectQuests } from '../../../hooks/useGetSubjectQuests';

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
	const {
		data: subjectQuests,
		isLoading: subjectQuestsLoading,
		isError: subjectQuestsError,
	} = useGetSubjectQuests(subjectId);

	return (
		<div className="flex flex-1 h-full flex-col">
			{!subjectQuestsLoading && (
				<>
					<div className="shrink-0">
						<QuestListHeader
							quests={subjectQuests}
							subjectId={subjectId}
						/>
					</div>

					<div className="flex-1 min-h-0 overflow-auto space-y-4 mt-4 no-scrollbar">
						<QuestList quests={subjectQuests} />
					</div>
				</>
			)}
		</div>
	);
}
