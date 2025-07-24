import { JSX, useEffect, useState } from 'react';
import { QuestRead } from '../../../services/api/schema/quest_schema';
import Modal from '../../../components/Modal';
import StepProgress from '../screens/SubjectScreen/Battle/SetupBattleSteps/StepProgress';
import PickAQuest from '../screens/SubjectScreen/Battle/SetupBattleSteps/PickAQuest';
import WriteSteps from '../screens/SubjectScreen/Battle/SetupBattleSteps/WriteSteps';
import { useBattleSetupStore } from '../../Battle/stores/battleSetupStore';
import StartBattle from '../screens/SubjectScreen/Battle/SetupBattleSteps/StartBattle';
import BattlePage from '../screens/SubjectScreen/Battle/BattlePage';
import { useBattleEngineStore } from '../../Battle/stores/battleEngineStore';
import { useSubjectStore_UI } from '../stores/subjectStore_UI';
import { useQueryClient } from '@tanstack/react-query';

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
	subjectQuests?: QuestRead[];
	initialStepNumber?: number;
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
	initialStepNumber,
}: StartBattleModalProps) {
	const [currentStep, setCurrentStep] = useState(0);
	const CurrentStepComponent = steps[currentStep].component;

	// Battle setup store usage
	const isBattleActive = useBattleSetupStore((state) => state.isBattleActive);
	const setIsBattleActive = useBattleSetupStore(
		(state) => state.setIsBattleActive
	);
	const battleDuration = useBattleSetupStore(
		(state) => state.durationMinutes
	);
	const resetBattleEngine = useBattleEngineStore(
		(state) => state.resetBattleEngine
	);
	const selectedQuest = useBattleSetupStore((state) => state.selectedQuest);
	const resetBattleSetup = useBattleSetupStore(
		(state) => state.resetBattleSetup
	);

	const battleResult = useBattleSetupStore((state) => state.battleResult);

	const queryClient = useQueryClient();

	const handleStartBattle = () => {
		console.log(
			'start battle with steps: ' + isBattleActive,
			useBattleSetupStore.getState().getCleanedQuestSteps()
		);
	};

	const handleCleanupBattlefield = async () => {
		await queryClient.invalidateQueries({
			queryKey: ['subjects', subjectId, 'quests'],
		});
		setCurrentStep(0);
		resetBattleSetup();
		resetBattleEngine();
		closeActiveModal();
		setIsBattleActive(false);
	};

	const getVariantFromResult = (result: 'defeat' | 'victory' | null) => {
		if (result === 'defeat') return 'danger';
		if (result === 'victory') return 'success';
		return 'primary';
	};

	const activeModal = useSubjectStore_UI((state) => state.activeModal);
	const closeActiveModal = useSubjectStore_UI(
		(state) => state.closeActiveModal
	);

	useEffect(() => {
		if (initialStepNumber) {
			setCurrentStep(1);
		} else {
			setCurrentStep(0);
		}
	}, [initialStepNumber]);

	if (activeModal !== 'StartBattleModal' || subjectQuests === undefined) {
		return null;
	}

	return (
		<Modal
			isOpen={isBattleActive || activeModal === 'StartBattleModal'}
			title={isBattleActive ? 'Battle in Progress' : 'Start Battle!'}
			lock={isBattleActive}
			disabledEsc={currentStep === steps.length - 1}
			onClose={closeActiveModal}
			customHeader={isBattleActive ? <></> : undefined}
			variant={getVariantFromResult(battleResult)}
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
				<BattlePage
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
	const questSteps = useBattleSetupStore((state) => state.questSteps);

	const canGoNext = () => {
		if (currentStep === 0) {
			return selectedQuest != null;
		}
		if (currentStep === 1) {
			if (questSteps.length === 1) {
				return questSteps[0].description.trim() !== '';
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
						: 'bg-danger/20 text-danger hover:bg-danger/30'
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
