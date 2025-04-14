import { BattleStepFn } from "../types";

export const enemyAttack: BattleStepFn = ({
    setEnemyLoop,
    setEnemyAction,
    setPlayerAction,
    adjustZValues,
    next
}) => {
    adjustZValues("enemy")
    setPlayerAction('idle');

    setEnemyLoop(false);
    setEnemyAction('attack');
    
    const attackAnimationDelay = setTimeout(() => {
        next()
    }, 250);

    return () => clearTimeout(attackAnimationDelay)
}