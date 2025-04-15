import { GiRoundStar } from 'react-icons/gi';
import { Quest } from '../../Subjects/components/Pages/Quest/QuestsPage';
import { BattleStepFn } from '../../Battle/battleEngine/types';
import { killEnemySequence } from '../../Battle/battleEngine/scenes/killEnemy/killEnemySequence';
import { memo, RefObject, useState, useCallback, useMemo, useEffect } from 'react';

interface SelectedQuestCardProps {
    quest: Quest;
    queueCustomSceneRef: RefObject<(battleScene: BattleStepFn[]) => void>;
    customSceneActiveRef: RefObject<boolean>;
}

const SelectedQuestCard = memo(({
    quest,
    queueCustomSceneRef,
    customSceneActiveRef
}: SelectedQuestCardProps) => {
    const [isCompleted, setIsCompleted] = useState(false);
    // Add a state variable to track the customSceneActive value
    const [isCustomSceneActive, setIsCustomSceneActive] = useState(false);
    
    // Update local state when ref changes
    useEffect(() => {
        // Initial check
        if (customSceneActiveRef.current !== undefined) {
            setIsCustomSceneActive(!!customSceneActiveRef.current);
        }
        
        // Setup an interval to check for changes
        const checkInterval = setInterval(() => {
            if (customSceneActiveRef.current !== undefined && 
                isCustomSceneActive !== !!customSceneActiveRef.current) {
                setIsCustomSceneActive(!!customSceneActiveRef.current);
            }
        }, 100); // Check every 100ms
        
        return () => clearInterval(checkInterval);
    }, [customSceneActiveRef, isCustomSceneActive]);

    const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            if (queueCustomSceneRef.current) {
                queueCustomSceneRef.current(killEnemySequence);
                // Wait a moment to ensure the animation has time to start
                setTimeout(() => {
                    setIsCompleted(true);
                }, 50);
            } else {
                setIsCompleted(true);
            }
        }
    }, [queueCustomSceneRef]);

    // Memoize the stars array to prevent recreating on every render
    const difficultyStars = useMemo(() => 
        Array.from({ length: quest.difficulty }, (_, i) => (
            <GiRoundStar key={i} className="w-3 h-3 text-accent" />
        ))
    , [quest.difficulty]);

    return (
        <div
            className={`bg-secondary rounded-lg pt-3 pb-1 px-3 w-full
                ${isCustomSceneActive && !isCompleted ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
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
                                ${isCompleted ? 'cursor-not-allowed' : 'cursor-pointer'}
                                text-[10px] text-background
                            `}
                        >
                            {isCompleted && '✓'}
                        </span>
                    </label>
                    <p className={`${isCompleted ? 'line-through opacity-70' : ''}`}>
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
});

SelectedQuestCard.displayName = 'SelectedQuestCard';

export default SelectedQuestCard;