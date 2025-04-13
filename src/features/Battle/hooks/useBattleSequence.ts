import { useEffect, useState } from 'react';
import { AnimationStateType } from './useCharacterAnimation';
import startKnockback from '../utils/startKnockback';

type Step = 'idle' | 'enemyWalk' | 'walkToMiddle' | 'enemyAttack' | 'playerReact' | 'done';

export const useBattleSequence = (
	setPlayerAction: (action: AnimationStateType) => void,
	setEnemyAction: (action: AnimationStateType) => void
) => {
	const [step, setStep] = useState<Step>('idle');
	const [enemyPosX, setEnemyPosX] = useState(6);
	const [playerPosX, setPlayerPosX] = useState(-18);

	// Control animation loop flags if needed
	const [enemyLoop, setEnemyLoop] = useState(true);
	const [playerLoop, setPlayerLoop] = useState(true);

	// === Main effect that reacts to step ===
	useEffect(() => {
        let walkInterval: NodeJS.Timeout;
        let attackTimeout: NodeJS.Timeout;
        let stepTransitionTimeout: NodeJS.Timeout;
    
        switch (step) {
            case 'walkToMiddle': {
                setEnemyAction('walk');
                setPlayerAction('walk');
                setEnemyLoop(true);
                setPlayerLoop(true);
            
                let enemyReached = false;
                let playerReached = false;
            
                const enemyTargetX = -34;
                const playerTargetX = -60;
            
                walkInterval = setInterval(() => {
                    setEnemyPosX((prev) => {
                        if (prev <= enemyTargetX) {
                            enemyReached = true;
                            return enemyTargetX;
                        }
                        return prev - 5;
                    });
            
                    setPlayerPosX((prev) => {
                        if (prev <= playerTargetX) {
                            playerReached = true;
                            return playerTargetX;
                        }
                        return prev - 6;
                    });
            
                    // Check if both have arrived at their target positions
                    if (enemyReached && playerReached) {
                        clearInterval(walkInterval);
                        setStep('enemyAttack');
                    }
                }, 50);
            
                break;
            }
    
            case 'enemyAttack': {
                attackTimeout = setTimeout(() => {
                    setEnemyLoop(false)
                    setEnemyAction('attack');
                    setPlayerAction('idle')
    
                    stepTransitionTimeout = setTimeout(() => {
                        setStep('playerReact');
                    }, 350); // Length of the attack animation
                }, 50); // Delay before attack starts
                break;
            }
    
            case 'playerReact': {
                setEnemyLoop(true);
                setEnemyAction('idle');
            
                setPlayerAction('hurt');
                setPlayerLoop(false);
            
                const cleanup = startKnockback({
                    fromX: playerPosX,
                    setX: setPlayerPosX,
                    knockbackDmg: 50,
                    onDone: () => setStep('done'),
                    direction: 'left', // player gets hit, flies left
                });
            
                return cleanup;
            }
            
            
                        
    
            case 'done': {
                setEnemyAction('idle');
                setPlayerAction('idle');
                setPlayerLoop(true);
                setEnemyLoop(true);
                break;
            }
        }
    
        // Clear all possible timeouts/intervals when the step changes
        return () => {
            clearInterval(walkInterval);
            clearTimeout(attackTimeout);
            clearTimeout(stepTransitionTimeout);
        };
    }, [step]);
    



	const startBattle = () => {
		setStep('walkToMiddle');
	};

	return {
		step,
		startBattle,
		enemyPosX,
		playerPosX,
		playerLoop,
		enemyLoop,
	};
};
