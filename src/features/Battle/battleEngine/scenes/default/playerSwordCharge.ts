import { enemyPosOffSetX } from "../../../components/BattleArena";
import { BattleStepFn } from "../../types"

export const playerSwordCharge: BattleStepFn = ({
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
    const chargeTargetX = getEnemyPosX()  + enemyPosOffSetX; // Move LEFT toward enemy

    const walkInterval = setInterval(() => {
        console.log(getPlayerPosX(), getEnemyPosX())
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
    console.log("playerCharge")
    
    return () => clearInterval(walkInterval);
}