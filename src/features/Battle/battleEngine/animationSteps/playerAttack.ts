import { BattleStepFn } from "../types";


export const playerAttack: BattleStepFn = ({
    next,
    setPlayerAction,
    setPlayerLoop,
    setEnemyAction,
}) => {
    setPlayerAction('attack_2');
    setPlayerLoop(false);
    setEnemyAction('idle');

    const cleanup = setTimeout(() => {
        setPlayerAction('idle');
        next()
    }, 350);

    return () => clearTimeout(cleanup);
}