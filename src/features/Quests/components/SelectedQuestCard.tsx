import { GiRoundStar } from 'react-icons/gi';
import { killEnemyScene } from '../../Battle/battleEngine/scenes/killEnemy/killEnemyScene';
import { memo, useState, useCallback, useMemo, ChangeEvent } from 'react';
import { useBattleUI } from '../../Battle/context/BattleUIContext';
import { QuestRead } from '../../../services/api/schema/quest_schema';

export const SelectedQuestCard = ({ quest }: { quest: QuestRead }) => {
	const [isCompleted, setIsCompleted] = useState(false);
	// Add a state variable to track the customSceneActive value

	const { customSceneActive, queueCustomScene, handleQuestComplete } =
		useBattleUI();

	const handleKillEnemySceneEnd = useCallback(() => {
		handleQuestComplete(quest.id);
	}, []);

	const handleCheckboxChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			console.log('natawag din naman');
			if (e.target.checked) {
				if (queueCustomScene) {
					queueCustomScene(
						killEnemyScene,
						'killEnemyScene',
						handleKillEnemySceneEnd
					);
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
					!isCompleted && customSceneActive
						? 'opacity-50 pointer-events-none cursor-not-allowed'
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
		</div>
	);
};

export default memo(SelectedQuestCard);
