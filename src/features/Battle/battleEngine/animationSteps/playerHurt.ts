import startKnockback from "../../utils/startKnockback";
import { BattleStepFn } from "../types";

export const playerHurt: BattleStepFn = ({
    next,
    adjustZValues,
    setEnemyLoop,
    setEnemyAction,
    setPlayerAction,
    setPlayerLoop,
    getPlayerPosX,
    setPlayerPosX
}) => {
    adjustZValues('player')

    setEnemyAction('idle');
    setEnemyLoop(true);
    
    setPlayerAction('hurt');
    setPlayerLoop(false);

    const cleanup = startKnockback({
        fromX: getPlayerPosX(),
        setX: setPlayerPosX,
        direction: 'left',
        knockbackDmg: 50,
        onDone: () => next(),
    });

    return cleanup;
}