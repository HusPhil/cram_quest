import React, { useEffect, useState } from 'react';
import { useSetupBattleStore } from '../../stores/setupBattleStore';

export default function WriteSteps() {
	const selectedQuest = useSetupBattleStore((state) => state.selectedQuest);
	const questSteps = useSetupBattleStore((state) => state.questSteps);
	const addQuestStep = useSetupBattleStore((state) => state.addQuestStep);
	const removeQuestStep = useSetupBattleStore(
		(state) => state.removeQuestStep
	);
	const updateQuestStep = useSetupBattleStore(
		(state) => state.updateQuestStep
	);
	// Create refs for input elements
	const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

	const addStep = () => {
		let emptyInputIndex: number | null = null;

		for (let i = 0; i < inputRefs.current.length; i++) {
			if (!inputRefs.current[i]?.value) {
				emptyInputIndex = i;
				break;
			}
		}

		if (emptyInputIndex !== null) {
			console.log('emptyInputIndex: ', emptyInputIndex);
			inputRefs.current[emptyInputIndex]?.focus();
			return;
		}

		// Update refs array to accommodate the new input
		addQuestStep('');
		inputRefs.current = [...inputRefs.current, null];

		setTimeout(() => {
			const newIndex = questSteps.length;
			if (inputRefs.current[newIndex]) {
				inputRefs.current[newIndex]?.focus();
			}
		}, 0);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			addStep();
		}
	};

	useEffect(() => {
		if (questSteps.length <= 0) {
			addStep();
		}
	}, []);

	return (
		<div className="space-y-4 max-h-80 overflow-auto">
			<h3 className="text-lg font-medium">Write your battle plan!</h3>
			<p className="text-sm text-text/70">
				Create a checklist of steps you'll take to complete this quest.
				Press Enter to add a new step.
			</p>

			<div className="space-y-2">
				{questSteps.map((step, index) => (
					<div key={index} className="flex items-center space-x-2">
						<div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
							{index + 1}.
						</div>
						<input
							type="text"
							defaultValue={step}
							onBlur={(e) =>
								updateQuestStep(index, e.target.value)
							}
							onKeyDown={handleKeyDown}
							className="flex-grow p-2 border border-text/20 rounded-md focus:border-accent focus:outline-none"
							placeholder={`Step ${index + 1}: What will you do?`}
							ref={(el) => {
								inputRefs.current[index] = el;
							}}
						/>
						<button
							onClick={() => removeQuestStep(index)}
							className="p-1 text-text/50 hover:text-accent"
							disabled={questSteps.length <= 1}
							title="Remove step"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>
				))}
			</div>

			<button
				onClick={addStep}
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
