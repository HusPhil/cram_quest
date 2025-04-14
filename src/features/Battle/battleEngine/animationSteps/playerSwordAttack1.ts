import { BattleStepFn } from "../types";


export const playerSwordAttack1: BattleStepFn = ({
    next,
    setPlayerAction,
    setPlayerLoop,
    setEnemyAction,
    adjustZValues
}) => {
    
    adjustZValues('player');
    setPlayerAction('attack_1');
    
    setPlayerLoop(false);

    const cleanup = setTimeout(() => {
        setPlayerAction('idle');
        next()
    }, 350);
    
    return () => clearTimeout(cleanup);
}