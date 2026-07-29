import { useCallback, useState } from 'react';
import { StepComponentProps } from '../../../../modals/StartBattleModal';
import { useBattleSetupStore } from '../../../../../Battle/stores/battleSetupStore';
import debounce from 'just-debounce-it';
import { useAuthInformationStore } from '../../../../../Auth/stores/authInformationStore';
import { BattleSessionRead } from '../../../../../../services/api/schema/battle_session_schema';
import { toast } from '../../../../../../lib/toastify/charLimitedToast';

const MAX_BATTLE_DURATION_MINS = 60 * 2;
const MIN_BATTLE_DURATION_MINS = 3;

export default function StartBattle({
	selectedQuest,
	onStartBattle,
	startBattleMutateFn,
}: StepComponentProps) {
	const [battleDuration, setBattleDuration] = useState<number>(
		MIN_BATTLE_DURATION_MINS
	); // Default 25 minutes (Pomodoro)
	const [isValidating, setIsValidating] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>(
		MIN_BATTLE_DURATION_MINS.toString()
	); // For immediate input display

	const currentPlayerId = useAuthInformationStore((state) => state.playerId);

	const getCleanedQuestSteps = useBattleSetupStore(
		(state) => state.getCleanedQuestSteps
	);

	const setGeneratedTasks = useBattleSetupStore(
		(state) => state.setGeneratedTasks
	);

	const setBattleSessionId = useBattleSetupStore(
		(state) => state.setBattleSessionId
	);

	const setGlobalBattleDuration = useBattleSetupStore(
		(state) => state.setDuration
	);

	const setIsBattleActive = useBattleSetupStore(
		(state) => state.setIsBattleActive
	);

	const handleStartBattle = () => {
		if (getCleanedQuestSteps().length > 0) {
			if (battleDuration > MAX_BATTLE_DURATION_MINS) {
				toast.error(
					`Duration cannot exceed ${MAX_BATTLE_DURATION_MINS} minutes`,
					{
						toastId: 'max-battle-duration',
					}
				);
				return;
			}

			if (battleDuration < MIN_BATTLE_DURATION_MINS) {
				toast.error(
					`Duration cannot be less than ${MIN_BATTLE_DURATION_MINS} minutes`,
					{
						toastId: 'min-battle-duration',
					}
				);
				return;
			}

			if (battleDuration > MAX_BATTLE_DURATION_MINS) {
				toast.error(
					`Duration cannot exceed ${MAX_BATTLE_DURATION_MINS} minutes`,
					{
						toastId: 'max-battle-duration',
					}
				);
				return;
			}

			if (
				!currentPlayerId ||
				!selectedQuest?.subject_id ||
				!selectedQuest?.id
			) {
				toast.error('Invalid quest selected', {
					toastId: 'invalid-selected-quest',
				});
				return;
			}
			onStartBattle?.();
			const battleStartRequestTime = new Date();

			setIsValidating(true);
			startBattleMutateFn?.(
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
					onSuccess: (newBattleSession: BattleSessionRead) => {
						const nowDateTime = new Date();

						const ellapsedTime =
							battleStartRequestTime.getTime() -
							nowDateTime.getTime();

						const serverStartTime = new Date(
							newBattleSession.start_time!
						);

						const startDateTimeWithOffset =
							serverStartTime.getTime() - ellapsedTime;

						const endDateTime = new Date(
							newBattleSession.end_time!
						);
						const timeDiffMilisecs =
							endDateTime.getTime() - startDateTimeWithOffset;

						const durationMins = timeDiffMilisecs / (1000 * 60);
						// Pass the duration to the parent component
						setGeneratedTasks(newBattleSession.tasks);
						setIsBattleActive(true);
						setGlobalBattleDuration(durationMins);
						setBattleSessionId(newBattleSession.id);
						toast.success(
							`Session started: ${battleDuration} minutes!`,
							{
								toastId: 'start-battle-success',
							}
						);
					},
					onError: () => {
						toast.error('Battle failed to start', {
							toastId: 'start-battle-error',
						});
					},
					onSettled: () => {
						setIsValidating(false);
					},
				}
			);
			return;
		}

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
