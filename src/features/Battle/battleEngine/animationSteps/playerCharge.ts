import { BattleStepFn } from "../types"

export const playerCharge: BattleStepFn = ({
    next,
    setPlayerAction,
    setPlayerLoop,
    getPlayerPosX,
    setPlayerPosX,

}) => {
    setPlayerAction('walk');
    setPlayerLoop(true);

    let chargeReached = false;
    const chargeTargetX = getPlayerPosX() - 50; // Move LEFT toward enemy

    const walkInterval = setInterval(() => {
        setPlayerPosX((prev) => {
            if (prev <= chargeTargetX) {
                chargeReached = true;
                return chargeTargetX;
            }
            return prev - 6; // step left
        });

        if (chargeReached) {
            next()
        }
        
    }
    , 50);
    
    return () => clearInterval(walkInterval);
}