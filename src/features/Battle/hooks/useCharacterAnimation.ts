import { useMemo } from "react";
import { baseAnimationConfig, CharacterType, AnimationConfig, AnimationState } from "../configs/animationConfig";




export function useCharacterAnimation(characterType: CharacterType) {

    const animationConfig = useMemo(() => {

        return Object.keys(baseAnimationConfig).reduce((config, state) => {

        })

    }, [characterType])

}

export default useCharacterAnimation