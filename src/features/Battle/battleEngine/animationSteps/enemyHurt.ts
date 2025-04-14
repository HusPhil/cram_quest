import startKnockback from "../../utils/startKnockback";
import { BattleStepFn } from "../types";

export const enemyHurt: BattleStepFn = ({
    next,
    setPlayerLoop,
    setPlayerAction,
    setEnemyAction,
    setEnemyLoop,
    getEnemyPosX,
    setEnemyPosX
}) => {
    setPlayerLoop(true);
    setEnemyAction('hurt');
    setPlayerAction('idle');
    setEnemyLoop(false);
    let cleanup: (() => void) | undefined;

    const handleKnockbackDone = () => {
        const transitionDelay = setTimeout(() => {
            next()
        }, 500);
        return () => clearTimeout(transitionDelay);
    }

    cleanup = startKnockback({
        fromX: getEnemyPosX(),
        setX: setEnemyPosX,
        direction: 'right',
        knockbackDmg: 60,
        onDone: () => next(),
    });

    return () => {
        if (cleanup) {
            cleanup();
        }
    };
}