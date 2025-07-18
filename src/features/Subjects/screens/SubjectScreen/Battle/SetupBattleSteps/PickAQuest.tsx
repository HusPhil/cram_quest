import { QuestRead } from '../../../../../../services/api/schema/quest_schema';
import { useBattleSetupStore } from '../../../../../Battle/stores/battleSetupStore';
import { StepComponentProps } from '../../../../modals/StartBattleModal';

export default function PickAQuest({ subjectQuests }: StepComponentProps) {
	const selectQuest = useBattleSetupStore((state) => state.selectQuest);
	const selectedQuest = useBattleSetupStore((state) => state.selectedQuest);

	return (
		<div className="space-y-4 max-h-80 overflow-auto">
			<p className="text-sm text-text/70">
				Choose a quest you want to complete.
			</p>
			<div className="space-y-2">
				{subjectQuests.map((quest: QuestRead) => (
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
	);
}
