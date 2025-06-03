import React, { useState, createContext, useContext } from 'react';
import Modal from '../../../../components/Modal';
import { QuestRead } from '../../../../services/api/schema/quest_schema';

// Create a context for the battle start modal
interface BattleStartContextType {
	handleQuestSelect: (quest: QuestRead) => void;
}

const BattleStartContext = createContext<BattleStartContextType>({
	handleQuestSelect: () => {},
});

interface BattleStartModalProps {
	subjectQuests: QuestRead[];
	isModalOpen: boolean;
	setIsModalOpen: (open: boolean) => void;
}

export default function BattleStartModal({
	subjectQuests,
	isModalOpen,
	setIsModalOpen,
}: BattleStartModalProps) {
	const [currentStep, setCurrentStep] = useState<number>(0);
	const [selectedQuest, setSelectedQuest] = useState<QuestRead | undefined>(
		undefined
	);

	const steps = [
		{ name: 'Pick a Quest', component: PickAQuest },
		{ name: 'Write Steps', component: WriteSteps },
		{ name: 'Start Battle', component: StartBattle },
	];

	const CurrentStepComponent = steps[currentStep].component;

	const handleQuestSelect = (quest: QuestRead) => {
		setSelectedQuest(quest);
	};

	return (
		<Modal
			isOpen={isModalOpen}
			onClose={() => setIsModalOpen(false)}
			title="Start Battle!"
		>
			<BattleStartContext.Provider value={{ handleQuestSelect }}>
				<div className="flex flex-col space-y-6">
					{/* Progress Bar */}
					<div className="w-full">
						<div className="flex justify-between mb-2">
							{steps.map((step, index) => (
								<div
									key={index}
									className={`flex flex-col items-center ${
										index <= currentStep
											? 'text-accent'
											: 'text-text/50'
									}`}
								>
									<div
										className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
											index < currentStep
												? 'bg-accent text-background border-accent'
												: index === currentStep
												? 'border-accent text-accent'
												: 'border-text/30 text-text/50'
										}`}
									>
										{index < currentStep ? (
											<svg
												className="w-4 h-4"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M5 13l4 4L19 7"
												/>
											</svg>
										) : (
											index + 1
										)}
									</div>
									<span className="text-sm mt-1 font-medium">
										{step.name}
									</span>
								</div>
							))}
						</div>
						<div className="relative w-full h-1 bg-text/20 rounded-full">
							<div
								className="absolute h-full bg-accent rounded-full transition-all duration-300"
								style={{
									width: `${
										(currentStep / (steps.length - 1)) * 100
									}%`,
								}}
							/>
						</div>
					</div>

					{/* Step Content */}
					<div className="mt-4">
						<CurrentStepComponent
							subjectQuests={subjectQuests}
							selectedQuest={selectedQuest}
						/>
					</div>

					{/* Navigation Buttons */}
					<div className="flex justify-between mt-6">
						<button
							onClick={() =>
								setCurrentStep(Math.max(0, currentStep - 1))
							}
							disabled={currentStep === 0}
							className={`px-4 py-2 rounded-md ${
								currentStep === 0
									? 'bg-text/20 text-text/50 cursor-not-allowed'
									: 'bg-primary/20 text-primary hover:bg-primary/30'
							}`}
						>
							Back
						</button>
						<button
							onClick={() =>
								setCurrentStep(
									Math.min(steps.length - 1, currentStep + 1)
								)
							}
							disabled={currentStep === steps.length - 1}
							className={`px-4 py-2 rounded-md ${
								currentStep === steps.length - 1
									? 'bg-text/20 text-text/50 cursor-not-allowed'
									: 'bg-accent text-background hover:bg-accent/90'
							}`}
						>
							{currentStep === steps.length - 1
								? 'Finish'
								: 'Next'}
						</button>
					</div>
				</div>
			</BattleStartContext.Provider>
		</Modal>
	);
}

interface StepComponentProps {
	subjectQuests: QuestRead[];
	selectedQuest?: QuestRead;
}

function PickAQuest({ subjectQuests, selectedQuest }: StepComponentProps) {
	// Get access to the parent component's handleQuestSelect function
	const { handleQuestSelect } = React.useContext(BattleStartContext);

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
						onClick={() => handleQuestSelect(quest)}
					>
						<p>{quest.description}</p>
					</div>
				))}
			</div>
		</div>
	);
}

function WriteSteps({ subjectQuests, selectedQuest }: StepComponentProps) {
	const [steps, setSteps] = useState<string[]>(['']);
	// Create refs for input elements
	const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

	const addStep = () => {
		setSteps([...steps, '']);
		// Update refs array to accommodate the new input
		inputRefs.current = [...inputRefs.current, null];

		// Focus will be handled after render via setTimeout
		setTimeout(() => {
			const newIndex = steps.length;
			if (inputRefs.current[newIndex]) {
				inputRefs.current[newIndex]?.focus();
			}
		}, 0);
	};

	const updateStep = (index: number, value: string) => {
		const newSteps = [...steps];
		newSteps[index] = value;
		setSteps(newSteps);
	};

	const removeStep = (index: number) => {
		if (steps.length > 1) {
			const newSteps = [...steps];
			newSteps.splice(index, 1);
			setSteps(newSteps);

			// Update refs array
			inputRefs.current = inputRefs.current.filter((_, i) => i !== index);

			// Focus on the previous input or the next one if available
			setTimeout(() => {
				const focusIndex = Math.min(index, newSteps.length - 1);
				if (inputRefs.current[focusIndex]) {
					inputRefs.current[focusIndex]?.focus();
				}
			}, 0);
		}
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			addStep();
		}
	};

	return (
		<div className="space-y-4 max-h-80 overflow-auto">
			<h3 className="text-lg font-medium">Write your battle plan!</h3>
			<p className="text-sm text-text/70">
				Create a checklist of steps you'll take to complete this quest.
				Press Enter to add a new step.
			</p>

			<div className="space-y-2">
				{steps.map((step, index) => (
					<div key={index} className="flex items-center space-x-2">
						<div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
							{index + 1}.
						</div>
						<input
							type="text"
							value={step}
							onChange={(e) => updateStep(index, e.target.value)}
							onKeyDown={(e) => handleKeyDown(e, index)}
							className="flex-grow p-2 border border-text/20 rounded-md focus:border-accent focus:outline-none"
							placeholder={`Step ${index + 1}: What will you do?`}
							ref={(el) => (inputRefs.current[index] = el)}
						/>
						<button
							onClick={() => removeStep(index)}
							className="p-1 text-text/50 hover:text-accent"
							disabled={steps.length <= 1}
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

function StartBattle({ subjectQuests, selectedQuest }: StepComponentProps) {
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
				onClick={() => console.log(subjectQuests)}
				className="px-6 py-3 bg-accent text-background rounded-md hover:bg-accent/90 mt-4"
			>
				Begin Battle
			</button>
		</div>
	);
}
