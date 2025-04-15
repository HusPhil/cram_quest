import { BattleStepFn } from "../types";


export const playerSwordAttack1: BattleStepFn = ({
    next,
    setPlayerAction,
    setPlayerLoop,
    adjustZValues
}) => {
    
    adjustZValues('player');
    setPlayerAction('attack_1');
    
    setPlayerLoop(false);

    const cleanup = setTimeout(() => {
        next()
    }, 350);
    
    return () => clearTimeout(cleanup);
}