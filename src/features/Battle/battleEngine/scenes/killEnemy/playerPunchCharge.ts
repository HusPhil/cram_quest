import { arenaMiddle, enemyPosOffSetX } from "../../../components/BattleArena";
import { BattleStepFn } from "../../types"

export const playerPunchCharge: BattleStepFn = ({
    next,
    setPlayerAction,
    setPlayerLoop,
    getPlayerPosX,
    setPlayerPosX,
    adjustZValues
}) => {
    adjustZValues("player")
    setPlayerAction('attack_3');
    setPlayerLoop(true);

    let chargeReached = false;
    const chargeTargetX = arenaMiddle  + enemyPosOffSetX; // Move LEFT toward enemy

    const walkInterval = setInterval(() => {
        console.log(getPlayerPosX())
        setPlayerPosX((prev) => {
            if (prev >= chargeTargetX) {
                chargeReached = true;
                return chargeTargetX;
            }
            return prev + 25; 
        });

        if (chargeReached) {
            next()
        }
        
    }
    , 20);
    
    return () => clearInterval(walkInterval);
}