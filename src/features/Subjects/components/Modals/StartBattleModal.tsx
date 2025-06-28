import { JSX, use, useState } from 'react';
import { QuestRead } from '../../../../services/api/schema/quest_schema';
import Modal from '../../../../components/Modal';
import StepProgress from '../SetupBattleSteps/StepProgress';
import PickAQuest from '../SetupBattleSteps/PickAQuest';
import WriteSteps from '../SetupBattleSteps/WriteSteps';
import { useSetupBattleStore } from '../../stores/setupBattleStore';
import StartBattle from '../SetupBattleSteps/StartBattle';
import BattleScreen from '../Battle/BattleScreen';
import { useBattleEngineStore } from '../../stores/battleEngineStore';

export interface StepComponentProps {
	subjectQuests: QuestRead[];
	selectedQuest?: QuestRead;
	onStartBattle?: () => void;
}

export interface SetupBattleStep {
	name: string;
	component: ({
		subjectQuests,
		selectedQuest,
		onStartBattle,
	}: StepComponentProps) => JSX.Element;
}

interface StartBattleModalProps {
	subjectId: number;
	subjectQuests: QuestRead[];
	isModalOpen: boolean;
	setIsModalOpen: (open: boolean) => void;
}

const steps: SetupBattleStep[] = [
	{
		name: 'Pick a Quest',
		component: PickAQuest,
	},
	{
		name: 'Write Steps',
		component: WriteSteps,
	},
	{
		name: 'Start Battle',
		component: StartBattle,
	},
];

export default function StartBattleModal({
	subjectId,
	subjectQuests,
	isModalOpen,
	setIsModalOpen,
}: StartBattleModalProps) {
	const [currentStep, setCurrentStep] = useState(0);
	const CurrentStepComponent = steps[currentStep].component;

	// Battle setup store usage
	const isBattleActive = useSetupBattleStore((state) => state.isBattleActive);
	const battleDuration = useSetupBattleStore(
		(state) => state.durationMinutes
	);
	const resetBattleEngine = useBattleEngineStore(
		(state) => state.resetBattleEngine
	);
	const selectedQuest = useSetupBattleStore((state) => state.selectedQuest);
	const resetBattleSetup = useSetupBattleStore(
		(state) => state.resetBattleSetup
	);

	const handleStartBattle = () => {
		console.log(
			'start battle with steps: ' + isBattleActive,
			useSetupBattleStore.getState().getCleanedQuestSteps()
		);
	};

	const handleCleanupBattlefield = () => {
		setCurrentStep(0);
		resetBattleSetup();
		resetBattleEngine();
		setIsModalOpen(false);
	};

	return (
		<Modal
			isOpen={isBattleActive || isModalOpen}
			title={isBattleActive ? 'Battle in Progress' : 'Start Battle!'}
			onClose={() => setIsModalOpen(false)}
			customHeader={isBattleActive ? <></> : undefined}
		>
			{!isBattleActive ? (
				<>
					<StepProgress currentStep={currentStep} steps={steps} />

					{/* Step Content */}
					<div className="mt-4">
						<CurrentStepComponent
							selectedQuest={selectedQuest || undefined}
							subjectQuests={subjectQuests}
							onStartBattle={handleStartBattle}
						/>
					</div>

					<StepNavigation
						selectedQuest={selectedQuest || undefined}
						currentStep={currentStep}
						setCurrentStep={setCurrentStep}
					/>
				</>
			) : (
				<BattleScreen
					battleCleanup={handleCleanupBattlefield}
					battleDuration={battleDuration}
					currentQuest={selectedQuest!}
				/>
			)}
		</Modal>
	);
}

interface StepNavigationProps {
	selectedQuest?: QuestRead;
	currentStep: number;
	setCurrentStep: (stepNum: number) => void;
}

const StepNavigation = ({
	selectedQuest,
	currentStep,
	setCurrentStep,
}: StepNavigationProps) => {
	const questSteps = useSetupBattleStore((state) => state.questSteps);

	const canGoNext = () => {
		if (currentStep === 0) {
			return selectedQuest != null;
		}
		if (currentStep === 1) {
			if (questSteps.length === 1) {
				return questSteps[0] !== '';
			}
			return questSteps.length > 0;
		}
		return false;
	};

	return (
		<div className="flex justify-between mt-6">
			<button
				onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
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
					setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
				}
				disabled={!canGoNext()}
				className={`px-4 py-2 rounded-md disabled:bg-text/20 disabled:text-text/50 disabled:cursor-not-allowed ${
					currentStep === steps.length - 1
						? 'bg-text/20 text-text/50 cursor-not-allowed'
						: 'bg-accent text-background hover:bg-accent/90'
				}`}
			>
				{currentStep === steps.length - 1 ? 'Finish' : 'Next'}
			</button>
		</div>
	);
};
