import { BattleStepFn } from "../types";

export const enemyAttack: BattleStepFn = ({
    setEnemyLoop,
    setEnemyAction,
    setPlayerAction,
    adjustZValues,
    next
}) => {
    adjustZValues("enemy")
    setEnemyLoop(false);
    setEnemyAction('attack');
    setPlayerAction('idle');

    const attackAnimationDelay = setTimeout(() => {
        next()
    }, 300);

    return () => clearTimeout(attackAnimationDelay)
}