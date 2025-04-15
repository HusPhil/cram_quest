import { arenaMiddle, enemyPosOffSetX } from '../../../components/BattleArena';
import { BattleStepFn } from '../../types';

export const walkToMiddle: BattleStepFn = ({
  setEnemyAction,
  setPlayerPosX,
  setPlayerAction,
  setEnemyPosX,
  getPlayerPosX,
  getEnemyPosX,
  next,
}) => {

  setEnemyAction('walk');
  setPlayerAction('walk')

  const targetPlayerX = arenaMiddle - enemyPosOffSetX;
  const targetEnemyX = arenaMiddle + enemyPosOffSetX;

  let reached = false;

  
  const interval = setInterval(() => {
    setPlayerPosX((prev) => {
      if (prev >= targetPlayerX) return targetPlayerX;
      return prev + 6;
    });

    setEnemyPosX((prev) => {
      if (prev <= targetEnemyX) return targetEnemyX;
      return prev - 6;
    });

    if (
      getPlayerPosX() >= targetPlayerX &&
      getEnemyPosX() <= targetEnemyX &&
      !reached
    ) {
      reached = true;
      clearInterval(interval);
      next();
    }
  }, 50);

  return () => {
    clearInterval(interval)
  };
};
