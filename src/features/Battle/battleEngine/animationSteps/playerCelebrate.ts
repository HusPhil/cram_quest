import { BattleStepFn } from "../types";

export const playerCelebrate: BattleStepFn = ({
    next,
    setPlayerAction,
    setPlayerPosX,
    setPlayerLoop,
    adjustZValues
}) => {
    adjustZValues("player");
    setPlayerAction("celebrate");
    setPlayerLoop(true);
    const exitPosX = 48 * 5
    let exitReached = false;

    let walkInterval: number;
    let transitionDelay: number;

    walkInterval = window.setInterval(() => {
        setPlayerPosX((prev) => {
            if (prev >= exitPosX) {
                exitReached = true;
                return exitPosX;
            }
            return prev + 6; 
        });

        if (exitReached) {
            setPlayerPosX(0)
            setPlayerAction("idle")
            next()
        }
        
    }
    , 50);

    return () => {
        clearInterval(walkInterval);
    }
}
