import QuestListHeader from '../../../components/quest/QuestListHeader';
import QuestList from '../../../components/quest/QuestList';
import { useGetSubjectQuests } from '../../../hooks/quest/useGetSubjectQuests';
import { QuestRead } from '../../../../../services/api/schema/quest_schema';
import { useEffect } from 'react';
import { useSubjectStore_UI } from '../../../stores/subjectStore_UI';

export default function QuestsPage({ subjectId }: { subjectId: number }) {
	const { data: subjectQuests, isLoading: subjectQuestsLoading } =
		useGetSubjectQuests(subjectId);

	const setSubjectQuests = useSubjectStore_UI(
		(state) => state.setSubjectQuests
	);

	useEffect(() => {
		if (subjectQuests) {
			setSubjectQuests(subjectQuests);
		}
	}, [subjectQuests]);

	return (
		<div className="flex flex-1 h-full max-h-full flex-col">
			{!subjectQuestsLoading && (
				<>
					<div className="">
						<QuestListHeader
							quests={subjectQuests}
							subjectId={subjectId}
						/>
					</div>

					<div className="overflow-auto h-full no-scrollbar flex-1">
						<QuestList quests={subjectQuests as QuestRead[]} />
					</div>
				</>
			)}
		</div>
	);
}
