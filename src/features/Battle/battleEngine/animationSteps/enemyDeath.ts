import startKnockback from "../../utils/startKnockback";
import { BattleStepFn } from "../types";

export const enemyDeath: BattleStepFn = ({
    next,
    setPlayerLoop,
    setPlayerAction,
    setEnemyAction,
    setEnemyLoop,
    getEnemyPosX,
    setEnemyPosX
}) => {
    setPlayerLoop(true);
    setEnemyAction('death');
    setPlayerAction('idle');
    setEnemyLoop(false);
    let cleanup: (() => void) | undefined;

    cleanup = startKnockback({
        fromX: getEnemyPosX(),
        setX: setEnemyPosX,
        direction: 'right',
        knockbackDmg: 30,
        onDone: () => next(),
    });

    return () => {
        if (cleanup) {
            cleanup();
        }
    };
}