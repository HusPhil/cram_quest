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

    const cleanup = startKnockback({
        fromX: getEnemyPosX(),
        setX: setEnemyPosX,
        direction: 'right',
        knockbackDmg: 50,
        onDone: () => next(),
    });

    return cleanup;
}