import { useEffect } from 'react';
import useCharacterAnimation, { AnimationStateType } from '../../Battle/hooks/useCharacterAnimation';
import { useBattleEngine } from './useBattleEngine';
import { defaultBattleSequence } from '../../Battle/battleEngine/scenes/default/defaultSequence';
import { parsePlayerAvatar } from '../../Battle/utils/parsePlayerAvatar';

export const useBattleSetup = () => {
  // Character setup
  const playerProfileAvatarUrl = 'default/default_1.png';
  const { playerClass, playerSkin } = parsePlayerAvatar(playerProfileAvatarUrl);

  // Player animation
  const {
    getAnimationParams: getPlayerAnimation,
    setCurrentAction: setPlayerCurrentAction,
  } = useCharacterAnimation('player', playerClass, playerSkin);

  // Enemy animation
  const {
    getAnimationParams: getEnemyAnimation,
    setCurrentAction: setEnemyCurrentAction,
  } = useCharacterAnimation('orc');

  // Battle engine
  const {
    startBattle,
    enemyPosX,
    enemyLoop,
    enemyZ,
    playerPosX,
    playerLoop,
    playerZ,
    setEnemyActionRef,
    setPlayerActionRef,
    queueCustomScene,
    customSceneActiveRef,
    setLoop,
  } = useBattleEngine(defaultBattleSequence);

  // Initialize battle
  useEffect(() => {
    // Connect action refs
    setPlayerActionRef.current = (action: AnimationStateType) =>
      setPlayerCurrentAction(action);
    setEnemyActionRef.current = (action: AnimationStateType) =>
      setEnemyCurrentAction(action);
    
    // Initialize and start
    setLoop(true);
    startBattle();
  }, []);

  // Organize props for components
  const arenaProps = {
    playerZ,
    playerLoop,
    playerPosX,
    enemyZ,
    enemyLoop,
    enemyPosX,
    getPlayerAnimation,
    getEnemyAnimation,
    customSceneActiveRef,
  };

  const questListProps = {
    queueCustomScene,
    customSceneActive: !!customSceneActiveRef.current,
  };

  const battleProps = {
    queueCustomScene,
    startBattle,
  };

  return {
    arenaProps,
    questListProps,
    battleProps,
  };
};