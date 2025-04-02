import { useMemo, useState } from "react";
import { baseAnimationConfig, CharacterType, AnimationConfig, AnimationState, characterOverrides, characterAssets } from "../configs/animationConfig";

export function useCharacterAnimation(characterType: CharacterType) {
    // Track the current animation state (idle, attack, etc.)
    const [currentAction, setCurrentAction] = useState<AnimationState>('idle');

    const animationConfig = useMemo(() => {
        return Object.keys(baseAnimationConfig).reduce((config, state) => {
            const animState = state as AnimationState;
            config[animState] = {
                ...baseAnimationConfig[animState as keyof typeof baseAnimationConfig],
                ...((characterOverrides[characterType] as Record<string, Partial<AnimationConfig>>)?.[animState] || {})
            };
            return config;
        }, {} as Record<AnimationState, AnimationConfig>);
    }, [characterType]);

    // Modified to return current animation by default or specific state if provided
    const getAnimationParams = (state?: AnimationState) => {
        // If no state is provided, use currentAction
        const animState = state || currentAction;
        const otherAnimationParams = animationConfig[animState] || animationConfig.idle
        const animationParams = {
            ...otherAnimationParams,
            characterAsset: characterAssets[characterType]
        }
        return animationParams;
    };

    return { 
        currentAction,
        setCurrentAction,
        getAnimationParams,   // Now returns current animation by default
        animationConfig
    };
}

export default useCharacterAnimation;