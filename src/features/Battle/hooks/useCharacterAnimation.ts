import { useMemo, useState } from "react";
import { 
  AnimationState, 
  CharacterType,
  PlayerClass,
  PlayerSkin,
  enemyAssets,
  playerAssets
} from "../configs/animations/animationConfig";
import { mergeAnimationConfig } from "../utils/mergeAnimation";


export function useCharacterAnimation(
  characterType: CharacterType,
  playerClass?: PlayerClass,
  playerSkin?: PlayerSkin
) {
  // Track the current animation state (idle, attack, etc.)
  const [currentAction, setCurrentAction] = useState<AnimationState>('idle');

  // Use the mergeAnimationConfig utility to get a complete animation config
  const animationConfig = useMemo(() => {
    return mergeAnimationConfig(characterType, playerClass, playerSkin);
  }, [characterType, playerClass, playerSkin]);

  // Get the appropriate asset based on character type
  const characterAsset = useMemo(() => {
    if (characterType === 'player' && playerClass && playerSkin) {
      return playerAssets[playerClass][playerSkin];
    } else {
      const enemyType = characterType as Exclude<CharacterType, 'player'>;
      return enemyAssets[enemyType];
    }
  }, [characterType, playerClass, playerSkin]);

  // Get animation parameters for a specific state or current action
  const getAnimationParams = (state?: AnimationState) => {
    // If no state is provided, use currentAction
    const animState = state || currentAction;
    const animConfig = animationConfig[animState] || animationConfig.idle;
    
    return {
      ...animConfig,
      characterAsset
    };
  };

  return { 
    currentAction,
    setCurrentAction,
    getAnimationParams,
    animationConfig
  };
}

export default useCharacterAnimation;