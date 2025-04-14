import { BattleStepFn } from "../types";

export const playerPunch: BattleStepFn = ({
    next,
    setPlayerAction,
    adjustZValues
}) => {
    adjustZValues("player");
    setPlayerAction("attack_3")

    const transitionDelay = setTimeout(() => {
        next()
    }, 200)

    return () => clearTimeout(transitionDelay)
}