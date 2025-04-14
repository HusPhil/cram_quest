import { enemyPosOffSetX } from "../../../components/BattleArena";
import { BattleStepFn } from "../../types"

export const playerPunchCharge: BattleStepFn = ({
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
    const chargeTargetX = getEnemyPosX()  + enemyPosOffSetX + 30; // Move LEFT toward enemy

    const walkInterval = setInterval(() => {
        console.log(getPlayerPosX())
        setPlayerPosX((prev) => {
            if (prev >= chargeTargetX) {
                chargeReached = true;
                return chargeTargetX;
            }
            return prev + 30; 
        });

        if (chargeReached) {
            next()
        }
        
    }
    , 20);
    console.log("playerCharge")
    
    return () => clearInterval(walkInterval);
}