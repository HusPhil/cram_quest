import { BattleStepFn } from "../types";


export const playerSwordAttack2: BattleStepFn = ({
    next,
    setPlayerAction,
    setPlayerLoop,
    setEnemyAction,
    adjustZValues
}) => {
    
    adjustZValues('player');
    setPlayerAction('attack_2');
    setPlayerLoop(false);
    setEnemyAction('idle');

    const cleanup = setTimeout(() => {
        setPlayerAction('idle');
        next()
    }, 350);

    return () => clearTimeout(cleanup);
}