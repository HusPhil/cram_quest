import { useCallback, useState } from 'react';
import { StepComponentProps } from '../Modals/StartBattleModal';
import { useSetupBattleStore } from '../../stores/setupBattleStore';
import { toast } from 'react-toastify';
import debounce from 'just-debounce-it';
import { useStartBattleSession } from '../../hooks/useStartBattleSession';
import { usePlayerInformationStore } from '../../../Auth/store/playerInformationStore';

const MAX_BATTLE_DURATION_MINS = 60 * 2;
// const MIN_BATTLE_DURATION_MINS = Math.floor(60 * 0.5);
const MIN_BATTLE_DURATION_MINS = 3;

export default function StartBattle({
	selectedQuest,
	onStartBattle,
}: StepComponentProps) {
	const [battleDuration, setBattleDuration] = useState<number>(
		MIN_BATTLE_DURATION_MINS
	); // Default 25 minutes (Pomodoro)
	const [isValidating, setIsValidating] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>(
		MIN_BATTLE_DURATION_MINS.toString()
	); // For immediate input display

	const currentPlayerId = usePlayerInformationStore(
		(state) => state.player_id
	);

	const getCleanedQuestSteps = useSetupBattleStore(
		(state) => state.getCleanedQuestSteps
	);

	const setGlobalBattleDuration = useSetupBattleStore(
		(state) => state.setDuration
	);

	const setIsBattleActive = useSetupBattleStore(
		(state) => state.setIsBattleActive
	);

	const startBattleMutate = useStartBattleSession();

	const handleStartBattle = () => {
		if (getCleanedQuestSteps().length > 0) {
			if (battleDuration > MAX_BATTLE_DURATION_MINS) {
				toast.error(
					`Battle duration cannot exceed ${MAX_BATTLE_DURATION_MINS} minutes`,
					{
						toastId: 'max-battle-duration',
					}
				);
				return;
			}

			if (battleDuration < MIN_BATTLE_DURATION_MINS) {
				toast.error(
					`Battle duration cannot be less than ${MIN_BATTLE_DURATION_MINS} minutes`,
					{
						toastId: 'min-battle-duration',
					}
				);
				return;
			}

			if (battleDuration > MAX_BATTLE_DURATION_MINS) {
				toast.error(
					`Battle duration cannot be more than ${MAX_BATTLE_DURATION_MINS} minutes`,
					{
						toastId: 'max-battle-duration',
					}
				);
				return;
			}

			if (
				!currentPlayerId ||
				!selectedQuest?.subject_id ||
				!selectedQuest.id
			) {
				toast.error('Something is wrong with the quest you selected!', {
					toastId: 'invalid-selected-quest',
				});
				console.log('selectedQuest', selectedQuest);
				return;
			}

			startBattleMutate.mutate(
				{
					startBattleSession: {
						duration_mins: battleDuration,
						player_id: currentPlayerId,
						quest_id: selectedQuest.id,
						subject_id: selectedQuest.subject_id,
						tasks_to_create: getCleanedQuestSteps(),
					},
				},
				{
					onSuccess: () => {
						// Pass the duration to the parent component
						setIsBattleActive(true);
						setGlobalBattleDuration(battleDuration);
						onStartBattle?.();
						toast.success(
							`Battle started for ${battleDuration} minutes!`,
							{
								toastId: 'start-battle',
							}
						);
					},
					onError: () => {
						toast.error('Failed to start the battle', {
							toastId: 'start-battle',
						});
					},
				}
			);
			return;
		}

		console.log('Please plan your approach before starting the battle.');
		toast.error('Plan your approach first', {
			toastId: 'setup-battle-zero-steps',
		});
	};

	const isStringOnlyDigits = (str: string) => {
		return /^\d+$/.test(str);
	};

	// Debounced function that validates and cleans the value
	const debouncedValidateAndSet = useCallback(
		debounce((value: string) => {
			if (value === '') {
				setBattleDuration(MIN_BATTLE_DURATION_MINS);
				setInputValue(MIN_BATTLE_DURATION_MINS.toString());
				setIsValidating(false);
				return;
			}

			if (!isStringOnlyDigits(value)) {
				setIsValidating(false);
				return;
			}

			const numValue = parseInt(value);
			const cleanedValue = Math.max(
				MIN_BATTLE_DURATION_MINS,
				Math.min(numValue, MAX_BATTLE_DURATION_MINS)
			);

			setBattleDuration(cleanedValue);

			// Update input to show cleaned value if it was clamped
			if (cleanedValue !== numValue) {
				setInputValue(cleanedValue.toString());
			}

			setIsValidating(false);
		}, 800),
		[]
	);

	const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		// Allow empty string or digits only for immediate display
		if (value !== '' && !isStringOnlyDigits(value)) return;

		// Update input display immediately for smooth UX
		setInputValue(value);

		// Set loading state when starting validation
		setIsValidating(true);

		// Debounce the validation and state update
		debouncedValidateAndSet(value);
	};

	const handleIncrement = () => {
		const newValue = Math.min(battleDuration + 1, MAX_BATTLE_DURATION_MINS);
		setBattleDuration(newValue);
		setInputValue(newValue.toString());
	};

	const handleDecrement = () => {
		const newValue = Math.max(battleDuration - 1, MIN_BATTLE_DURATION_MINS);
		setBattleDuration(newValue);
		setInputValue(newValue.toString());
	};

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

			<div className="mt-4 space-y-2">
				<label
					htmlFor="battle-duration"
					className="block text-sm font-medium"
				>
					Battle Duration (minutes)
				</label>
				<div className="flex items-center justify-center space-x-2">
					<button
						type="button"
						onClick={handleDecrement}
						disabled={battleDuration <= MIN_BATTLE_DURATION_MINS}
						className="px-3 py-2 bg-accent/75 border border-gray-300 rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed text-background"
					>
						−
					</button>
					<input
						id="battle-duration"
						type="number"
						min={MIN_BATTLE_DURATION_MINS}
						max={MAX_BATTLE_DURATION_MINS}
						value={inputValue}
						onChange={handleDurationChange}
						className="px-3 py-2 border  rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-center w-20 text-black"
					/>
					<button
						type="button"
						onClick={handleIncrement}
						disabled={battleDuration >= MAX_BATTLE_DURATION_MINS}
						className="px-3 py-2 bg-accent/75 border border-gray-300 rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed text-background"
					>
						+
					</button>
				</div>
				<p className="text-xs text-gray-500">
					Recommended: 30-90 minutes
				</p>
			</div>

			<button
				disabled={isValidating}
				onClick={handleStartBattle}
				className="px-6 py-3 bg-accent disabled:opacity-50 rounded-md hover:bg-accent/90 mt-4 text-background"
			>
				Begin battle!
			</button>
		</div>
	);
}
