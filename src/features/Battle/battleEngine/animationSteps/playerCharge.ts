import { enemyPosOffSetX } from "../../components/BattleArena";
import { BattleStepFn } from "../types"

export const playerCharge: BattleStepFn = ({
    next,
    setPlayerAction,
    setPlayerLoop,
    getEnemyPosX,
    getPlayerPosX,
    setPlayerPosX,

}) => {
    setPlayerAction('walk');
    setPlayerLoop(true);

    let chargeReached = false;
    const chargeTargetX = getEnemyPosX() + enemyPosOffSetX; // Move LEFT toward enemy

    console.log(chargeTargetX, getPlayerPosX())

    const walkInterval = setInterval(() => {
        console.log(getPlayerPosX())
        setPlayerPosX((prev) => {
            if (prev >= chargeTargetX) {
                chargeReached = true;
                return chargeTargetX;
            }
            return prev + 6; 
        });

        if (chargeReached) {
            next()
        }
        
    }
    , 50);
    
    return () => clearInterval(walkInterval);
}