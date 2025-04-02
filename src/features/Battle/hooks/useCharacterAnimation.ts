import { useMemo, useState } from "react";
import { 
  EnemyAnimationState,
  PlayerAnimationState,
  CharacterType,
  PlayerClass,
  PlayerSkin,
  enemyAssets,
  playerAssets,
  PlayerAnimations,
  EnemyAnimations
} from "../configs/animations/animationConfig";
import { mergeAnimationConfig } from "../utils/mergeAnimation";

type AnimationStateType = EnemyAnimationState | PlayerAnimationState;

export function useCharacterAnimation(
  characterType: CharacterType,
  playerClass?: PlayerClass,
  playerSkin?: PlayerSkin
) {
  // Track the current animation state with proper type based on character type
  const [currentAction, setCurrentAction] = useState<AnimationStateType>('idle');

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

  const getAnimationParams = (state?: AnimationStateType) => {
    // If no state is provided, use currentAction
    const animState = state || currentAction;
    
    // Type guard to handle different animation configs
    if (characterType === 'player') {
      const playerConfig = animationConfig as PlayerAnimations;
      const animConfig = playerConfig[animState as PlayerAnimationState] || playerConfig.idle;
      return { ...animConfig, characterAsset };
    } else {
      const enemyConfig = animationConfig as EnemyAnimations;
      const animConfig = enemyConfig[animState as EnemyAnimationState] || enemyConfig.idle;
      return { ...animConfig, characterAsset };
    }
  };

  return { 
    currentAction,
    setCurrentAction,
    getAnimationParams,
    animationConfig
  };
}
export default useCharacterAnimation;
