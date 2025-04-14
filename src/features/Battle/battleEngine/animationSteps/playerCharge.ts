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
    const chargeTargetX = -1 * getEnemyPosX() // Move LEFT toward enemy

    console.log(chargeTargetX)
    console.log(getPlayerPosX())
    setPlayerPosX(-75)

    // const walkInterval = setInterval(() => {
    //     setPlayerPosX((prev) => {
    //         // console.log(prev, "en", chargeTargetX)
    //         if (prev <= chargeTargetX) {
    //             chargeReached = true;
    //             return chargeTargetX;
    //         }
    //         return prev - 6; // step left
    //     });

    //     if (chargeReached) {
    //         next()
    //     }
        
    // }
    // , 50);
    
    // return () => clearInterval(walkInterval);
}