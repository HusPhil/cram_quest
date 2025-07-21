import React, { useEffect, useState } from 'react';
import { useBattleSetupStore } from '../../../../../Battle/stores/battleSetupStore';
import BattleSetupStepInput from '../../../../components/battle/BattleSetupStepInput';
import { toast } from 'react-toastify';

export default function WriteSteps() {
	const selectedQuest = useBattleSetupStore((state) => state.selectedQuest);
	const questSteps = useBattleSetupStore((state) => state.questSteps);
	const addQuestStep = useBattleSetupStore((state) => state.addQuestStep);
	const removeQuestStep = useBattleSetupStore(
		(state) => state.removeQuestStep
	);
	const updateQuestStep = useBattleSetupStore(
		(state) => state.updateQuestStep
	);

	const [lastAddedId, setLastAddedId] = useState<string | null>(null);

	const handleAddStep = () => {
		if (questSteps.length >= 15) {
			toast.warn('Oops, keep things simple for now.', {
				toastId: 'max-steps-reached',
			});
			return;
		}

		const empty = questSteps.find((s) => s.description.trim() === '');
		if (empty) return;

		const newId = addQuestStep('');
		setLastAddedId(newId);
	};

	const handleRemoveStep = (id: string) => {
		removeQuestStep(id);
	};

	useEffect(() => {
		if (useBattleSetupStore.getState().questSteps.length === 0) {
			handleAddStep();
		}
	}, []);

	// useEffect(() => {
	// 	console.log('refs questSteps', inputRefs.current);
	// 	console.log('effect questSteps', questSteps);
	// }, [questSteps]);

	return (
		<div className="space-y-4 max-h-80 overflow-auto scrollbar-thin scrollbar-accent">
			<h3 className="text-lg font-medium">Write your battle plan!</h3>
			<p className="text-sm text-text/70">
				List the battle plan in this quest. Best keep it under 5 words
				per step.
			</p>

			<small className="text-accent/75">
				Press Enter to add a new step.
			</small>

			<div className="space-y-2 px-3">
				{questSteps.map((step, index) => (
					<BattleSetupStepInput
						key={step.id}
						id={step.id}
						value={step.description}
						index={index}
						onChange={(val) => updateQuestStep(step.id, val)}
						onRemove={() => handleRemoveStep(step.id)}
						onAddNew={handleAddStep}
						autoFocus={lastAddedId === step.id}
						disableRemove={questSteps.length <= 1}
					/>
				))}
			</div>

			<button
				onClick={handleAddStep}
				className="flex items-center space-x-1 text-accent hover:text-accent/80"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
						clipRule="evenodd"
					/>
				</svg>
				<span>Add another step</span>
			</button>

			{selectedQuest && (
				<div className="mt-4 p-3 bg-accent/10 rounded-md">
					<p className="text-sm">{selectedQuest.description}</p>
				</div>
			)}
		</div>
	);
}
