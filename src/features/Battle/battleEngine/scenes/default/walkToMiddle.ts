import { enemyPosOffSetX } from '../../../components/BattleArena';
import { BattleStepFn } from '../../types';

export const walkToMiddle: BattleStepFn = ({
  setEnemyAction,
  setPlayerPosX,
  setEnemyPosX,
  getPlayerPosX,
  getEnemyPosX,
  next,
}) => {

  setEnemyAction('walk');

  const targetPlayerX = (6 * 12) - enemyPosOffSetX;
  const targetEnemyX = (6 * 12) + enemyPosOffSetX;

  let reached = false;

  
  const interval = setInterval(() => {
    setPlayerPosX((prev) => {
      if (prev >= targetPlayerX) return targetPlayerX;
      return prev + 6;
    });
    // console.log(getPlayerPosX(), getEnemyPosX())
    console.log(getPlayerPosX(), getEnemyPosX())

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
