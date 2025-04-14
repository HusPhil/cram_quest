import { BattleStepFn } from '../types';

export const walkToMiddle: BattleStepFn = ({
  setPlayerAction,
  setEnemyAction,
  setPlayerPosX,
  setEnemyPosX,
  getPlayerPosX,
  getEnemyPosX,
  adjustZValues,
  next,
}) => {

  adjustZValues('enemy');
  setEnemyAction('walk');

  const targetPlayerX = -60;
  const targetEnemyX = -34;

  let reached = false;

  const interval = setInterval(() => {
    setPlayerPosX((prev) => {
      if (prev <= targetPlayerX) return targetPlayerX;
      return prev - 6;
    });

    setEnemyPosX((prev) => {
      if (prev <= targetEnemyX) return targetEnemyX;
      return prev - 5;
    });

    if (
      getPlayerPosX() <= targetPlayerX &&
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
