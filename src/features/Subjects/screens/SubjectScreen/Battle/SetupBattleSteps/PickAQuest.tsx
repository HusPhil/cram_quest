import EmptyListNote from '../../../../../../components/EmptyListNote';
import { QuestRead } from '../../../../../../services/api/schema/quest_schema';
import { useBattleSetupStore } from '../../../../../Battle/stores/battleSetupStore';
import { StepComponentProps } from '../../../../modals/StartBattleModal';

export default function PickAQuest({ subjectQuests }: StepComponentProps) {
	const selectQuest = useBattleSetupStore((state) => state.selectQuest);
	const selectedQuest = useBattleSetupStore((state) => state.selectedQuest);

	const availableQuests = subjectQuests.filter(
		(quest: QuestRead) =>
			quest.status !== 'done' && quest.status !== 'archive'
	);

	return (
		<>
			{availableQuests.length === 0 ? (
				<div className="flex justify-center items-center min-h-36">
					<EmptyListNote
						message="You're all caught up!"
						hint="Add a new quest"
					/>
				</div>
			) : (
				<div className="space-y-4 max-h-80 min-h-36 overflow-auto scrollbar-thin p-3 scrollbar-stable">
					<p className="text-sm text-text/70">
						Choose a quest you want to complete.
					</p>
					<div className="space-y-2">
						{availableQuests.map((quest: QuestRead) => (
							<div
								key={quest.id}
								className={`p-3 border rounded-md hover:border-accent cursor-pointer ${
									selectedQuest?.id === quest.id
										? 'border-accent bg-accent/10'
										: 'border-text/20'
								}`}
								onClick={() => selectQuest(quest)}
							>
								<p>{quest.description}</p>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
}
