import { enemyAttack } from '../animationSteps/enemyAttack';
import { enemyHurt } from '../animationSteps/enemyHurt';
import { playerAttack } from '../animationSteps/playerAttack';
import { playerCharge } from '../animationSteps/playerCharge';
import { playerHurt } from '../animationSteps/playerHurt';
import { walkToMiddle } from '../animationSteps/walkToMiddle';
import { BattleStepFn } from '../types';

export const defaultBattleSequence: BattleStepFn[] = [
  walkToMiddle,
  enemyAttack,
  playerHurt,
  playerCharge,
  playerAttack,
  enemyHurt
];
