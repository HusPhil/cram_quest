import { baseEnemyAnimationConfig, basePlayerAnimationConfig, CharacterType, enemyAnimationOverrides, PlayerClass, playerClassOverrides, PlayerSkin, playerSkinOverrides } from "../configs/spritesheetConfig";

export function mergeAnimationConfig(
    characterType: CharacterType,
    playerClass?: PlayerClass,
    playerSkin?: PlayerSkin
  ) {
    if (characterType === 'player' && playerClass && playerSkin) {
      const baseConfig = { ...basePlayerAnimationConfig };
  
      if (playerClassOverrides[playerClass]) {
        Object.assign(baseConfig, playerClassOverrides[playerClass]);
      }
  
      if (playerSkinOverrides[playerClass]?.[playerSkin]) {
        Object.assign(baseConfig, playerSkinOverrides[playerClass][playerSkin]);
      }
  
      return baseConfig;
    }
  
    const baseConfig = { ...baseEnemyAnimationConfig };

    const enemyType = characterType as Exclude<CharacterType, 'player'>;
  
    if (enemyAnimationOverrides[enemyType]) {
      Object.assign(baseConfig, enemyAnimationOverrides[enemyType]);
    }
  
    return baseConfig;
  }
  