import React from 'react';
import { StepComponentProps } from '../Modals/StartBattleModal';

export default function StartBattle({
	subjectQuests,
	selectedQuest,
	handleStartBattle,
}: StepComponentProps) {
	return (
		<div className="space-y-4 text-center">
			<h3 className="text-lg font-medium">Ready to start your battle?</h3>
			<p>You've selected your quest and planned your approach.</p>
			{selectedQuest && (
				<div className="mt-4 p-3 bg-accent/10 rounded-md text-left">
					<h4 className="font-medium">QuestID: {selectedQuest.id}</h4>
					<p className="text-sm">{selectedQuest.description}</p>
				</div>
			)}
			<button
				onClick={handleStartBattle}
				className="px-6 py-3 bg-accent text-background rounded-md hover:bg-accent/90 mt-4"
			>
				Begin Battle
			</button>
		</div>
	);
}
