import { enemyPosOffSetX } from "../../../components/BattleArena";
import { BattleStepFn } from "../../types";


export const placeEnemyMiddle: BattleStepFn = ({
    next, 
    setEnemyAction,
    setPlayerAction,
    setEnemyLoop,
    setEnemyPosX
}) => {
    setEnemyLoop(true);
    setPlayerAction('idle');
    setEnemyAction('idle');
    setEnemyPosX(50 - enemyPosOffSetX);
    
    console.log("placeEnemyMiddle")

    const delay = setTimeout(() => {
        next()
    }, 50);

    return () => clearTimeout(delay);   
}