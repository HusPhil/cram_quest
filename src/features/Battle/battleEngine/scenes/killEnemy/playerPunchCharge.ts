import { arenaMiddle, enemyPosOffSetX } from "../../../components/BattleArena";
import { BattleStepFn } from "../../types"

export const playerPunchCharge: BattleStepFn = ({
    next,
    setPlayerAction,
    setPlayerLoop,
    setPlayerPosX,
    adjustZValues
}) => {
    // Reset position and adjust z-index
    setPlayerPosX(0);
    adjustZValues("player");

    // Start with a charge animation
    setPlayerAction('celebrate'); // Using a more appropriate animation
    setPlayerLoop(true);
    let chargeReached = false;
    const chargeTargetX = arenaMiddle + enemyPosOffSetX; // Target position to reach enemy

    // Change to attack animation after a brief charge period
    const earlyAttackDelay = setTimeout(() => {
        setPlayerAction('attack_3');
        setPlayerLoop(false); // Don't loop the attack animation
    }, 170);

    // Move player toward enemy
    const walkInterval = setInterval(() => {
        setPlayerPosX((prev) => {
            if (prev >= chargeTargetX) {
                chargeReached = true;
                return chargeTargetX;
            }
            return prev + 10; // Movement speed
        });

        // Proceed to next step when target position is reached
        if (chargeReached) {
            clearInterval(walkInterval);
            clearTimeout(earlyAttackDelay);
            next();
        }
    }, 50);
    
    // Cleanup function
    return () => {
        clearInterval(walkInterval);
        clearTimeout(earlyAttackDelay);
    };
};
