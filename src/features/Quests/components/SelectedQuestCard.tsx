import { GiRoundStar } from 'react-icons/gi';
import { Quest } from '../../Subjects/components/Pages/Quest/QuestsPage';
import { BattleStepFn } from '../../Battle/battleEngine/types';
import { killEnemySequence } from '../../Battle/battleEngine/scenes/killEnemy/killEnemySequence';
import {
	memo,
	useState,
	useCallback,
	useMemo,
	ChangeEvent,
} from 'react';

interface SelectedQuestCardProps {
	quest: Quest;
	queueCustomScene: (battleScene: BattleStepFn[]) => void;
	customSceneActive: boolean;
	onCheckboxChangeOnParent?: (e: ChangeEvent<HTMLInputElement>, quest: Quest) => void
}

export const SelectedQuestCard = ({
	quest,
	queueCustomScene,
	customSceneActive,
	onCheckboxChangeOnParent
}: SelectedQuestCardProps) => {
	const [isCompleted, setIsCompleted] = useState(false);
	// Add a state variable to track the customSceneActive value

	const handleCheckboxChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			onCheckboxChangeOnParent?.(e, quest)
			if (e.target.checked) {
				if (queueCustomScene) {
					queueCustomScene(killEnemySequence);
					// Wait a moment to ensure the animation has time to start
					setTimeout(() => {
						setIsCompleted(true);
					}, 50);
				} else {
					setIsCompleted(true);
				}
			}
		},
		[queueCustomScene]
	);

	// Memoize the stars array to prevent recreating on every render
	const difficultyStars = useMemo(
		() =>
			Array.from({ length: quest.difficulty }, (_, i) => (
				<GiRoundStar key={i} className="w-3 h-3 text-accent" />
			)),
		[quest.difficulty]
	);

	return (
		<div
			className={`bg-secondary rounded-lg pt-3 pb-1 px-3 w-full
                ${
					customSceneActive && !isCompleted
						? 'opacity-50 pointer-events-none'
						: 'opacity-100'
				}`}
		>
			<div className="flex justify-between">
				<div className="flex gap-3 items-start">
					<label className="flex items-start cursor-pointer">
						<input
							type="checkbox"
							disabled={isCompleted}
							hidden
							checked={isCompleted}
							onChange={handleCheckboxChange}
						/>
						<span
							className={`
                                inline-flex items-center justify-center w-4 h-4 rounded-sm border border-accent mt-1
                                ${isCompleted ? 'bg-accent' : 'bg-secondary'}
                                ${
									isCompleted
										? 'cursor-not-allowed'
										: 'cursor-pointer'
								}
                                text-[10px] text-background
                            `}
						>
							{isCompleted && '✓'}
						</span>
					</label>
					<p
						className={`${
							isCompleted ? 'line-through opacity-70' : ''
						}`}
					>
						{quest.description}
					</p>
				</div>
			</div>

			<hr className="flex-1 mt-2 border-text/50" />

			<div className="flex gap-2 items-center">
				{difficultyStars}
				<small className="text-xs my-4">{quest.deadline}</small>
			</div>
		</div>
	);
};

export default memo(SelectedQuestCard);
