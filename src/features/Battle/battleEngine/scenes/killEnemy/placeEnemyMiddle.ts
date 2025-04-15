import { arenaMiddle, enemyPosOffSetX } from "../../../components/BattleArena";
import { BattleStepFn } from "../../types";


export const placeEnemyMiddle: BattleStepFn = ({
    next, 
    setEnemyAction,
    setPlayerAction,
    setEnemyLoop,
    getEnemyPosX,
    setEnemyPosX,
}) => {
    setEnemyLoop(true);
    setPlayerAction('idle');
    setEnemyAction('walk');
    const targetX = arenaMiddle + enemyPosOffSetX
    const checkIfEnemyInTargetX = setInterval(() => {
        console.log('getEnemyPosX()', getEnemyPosX())
        setEnemyPosX(prev => prev - 6)
        
        if (getEnemyPosX() <= targetX) {
            setEnemyAction('idle')
            next()
        }
    }, 50)

    return () => clearTimeout(checkIfEnemyInTargetX);   
}