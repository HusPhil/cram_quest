import { BattleStepFn } from "../types";


export const placeEnemyMiddle: BattleStepFn = ({
    next, 
    setEnemyAction,
    setPlayerAction,
    setEnemyLoop,
    setEnemyPosX
}) => {
    setEnemyLoop(true);
    // setPlayerAction('idle');
    setEnemyAction('idle');
    setEnemyPosX(-50);
    next()
}