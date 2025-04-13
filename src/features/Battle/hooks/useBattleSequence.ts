import { useCallback, useEffect, useState } from 'react';
import { AnimationStateType } from './useCharacterAnimation';
import startKnockback from '../utils/startKnockback';

type Step =
	| 'idle'
	| 'enemyWalk'
	| 'walkToMiddle'
	| 'enemyAttack'
	| 'playerReact'
	| 'playerCharge'
	| 'playerAttack'
	| 'enemyReact'
	| 'done';

export const useBattleSequence = (
	setPlayerAction: (action: AnimationStateType) => void,
	setEnemyAction: (action: AnimationStateType) => void
) => {
	const [step, setStep] = useState<Step>('idle');

    const [ enemyZValue, setEnemyZValue ] = useState(100)
    const [ playerZValue, setPlayerZValue ] = useState(99)

	const [enemyPosX, setEnemyPosX] = useState(6);
	const [playerPosX, setPlayerPosX] = useState(-18);

	// Control animation loop flags if needed
	const [enemyLoop, setEnemyLoop] = useState(true);
	const [playerLoop, setPlayerLoop] = useState(true);

    const adjustZValues = useCallback((entityToBeAbove: 'enemy' | 'player') => {
        if (entityToBeAbove === 'enemy' && enemyZValue <= playerZValue) {
            setPlayerZValue(prev => prev - 10);
            setEnemyZValue(prev => prev + 10);
        } else if (entityToBeAbove === 'player' && playerZValue <= enemyZValue) {
            setPlayerZValue(prev => prev + 10);
            setEnemyZValue(prev => prev - 10);
        }
    }, [enemyZValue, playerZValue]);

	// === Main effect that reacts to step ===
	useEffect(() => {
		let walkInterval: NodeJS.Timeout;
		let timeout1: NodeJS.Timeout;
		let timeout2: NodeJS.Timeout;

		switch (step) {
			case 'walkToMiddle': {
                adjustZValues('enemy')

				setEnemyAction('walk');
				// setPlayerAction('walk');
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
                            setEnemyAction("attack")
							return enemyTargetX;
						}
						return prev - 5;
					});

					setPlayerPosX((prev) => {
						if (prev <= playerTargetX) {
                            setPlayerAction("idle")
							playerReached = true;
							return playerTargetX;
						}
						return prev - 6;
					});

					if (enemyReached && playerReached) {
						clearInterval(walkInterval);
						setStep('enemyAttack');
					}
				}, 50);
				break;
			}

			case 'enemyAttack': {
				setEnemyLoop(false);
                setEnemyAction('attack');
                setPlayerAction('idle');

                timeout2 = setTimeout(() => {
                    setStep('playerReact');
                }, 300);
				break;
			}

			case 'playerReact': {
                adjustZValues('player')
				setEnemyLoop(true);
				setEnemyAction('idle');
				setPlayerAction('hurt');
				setPlayerLoop(false);

				const cleanup = startKnockback({
					fromX: playerPosX,
					setX: setPlayerPosX,
					direction: 'left',
					knockbackDmg: 50,
					onDone: () => setStep('playerCharge'),
				});

				return cleanup;
			}

			case 'playerCharge': {
				setPlayerAction('walk');
				setPlayerLoop(true);

				let chargeReached = false;
				const chargeTargetX = playerPosX - 50; // Move LEFT toward enemy

				walkInterval = setInterval(() => {
					setPlayerPosX((prev) => {
						if (prev <= chargeTargetX) {
							chargeReached = true;
							return chargeTargetX;
						}
						return prev - 6; // step left
					});

					if (chargeReached) {
						clearInterval(walkInterval);
						setStep('playerAttack');
					}
				}, 50);

				break;
			}

			case 'playerAttack': {
				setPlayerAction('attack_2');
				setPlayerLoop(false);
				setEnemyAction('idle');

				timeout1 = setTimeout(() => {
                    setPlayerAction('idle');
					setStep('enemyReact');
				}, 400);
				break;
			}

			case 'enemyReact': {
				setPlayerLoop(true);
				setEnemyAction('hurt');
				setPlayerAction('idle');
				setEnemyLoop(false);

				const cleanup = startKnockback({
					fromX: enemyPosX,
					setX: setEnemyPosX,
					direction: 'left',
					knockbackDmg: 50,
					onDone: () => setStep('walkToMiddle'),
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

		return () => {
			clearInterval(walkInterval);
			clearTimeout(timeout1);
			clearTimeout(timeout2);
		};
	}, [step]);

	const startBattle = () => {
		setStep('walkToMiddle');
	};

	return {
		step,
		startBattle,
		enemyPosX,
		enemyLoop,
        enemyZValue,
		playerPosX,
		playerLoop,
        playerZValue,
	};
};
