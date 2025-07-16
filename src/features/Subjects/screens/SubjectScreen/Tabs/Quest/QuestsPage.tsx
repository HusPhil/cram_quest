import QuestListHeader from './QuestListHeader';
import QuestList from './QuestList';
import { useGetSubjectQuests } from '../../../../hooks/useGetSubjectQuests';
import { QuestRead } from '../../../../../../services/api/schema/quest_schema';

export default function QuestsPage({ subjectId }: { subjectId: number }) {
	const { data: subjectQuests, isLoading: subjectQuestsLoading } =
		useGetSubjectQuests(subjectId);

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
						<QuestList quests={subjectQuests as QuestRead[]} />
					</div>
				</>
			)}
		</div>
	);
}
