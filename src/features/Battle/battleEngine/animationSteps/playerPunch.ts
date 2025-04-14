import { BattleStepFn } from "../types";

export const playerPunch: BattleStepFn = ({
    setPlayerAction
}) => {
    setPlayerAction("attack_3")
}