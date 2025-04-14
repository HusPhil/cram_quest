import { enemyAttack } from '../../animationSteps/enemyAttack';
import { enemyHurt } from '../../animationSteps/enemyHurt';
import { playerSwordAttack2 } from '../../animationSteps/playerSwordAttack2';
import { playerSwordCharge } from './playerSwordCharge';
import { playerHurt } from '../../animationSteps/playerHurt';
import { walkToMiddle } from './walkToMiddle';
import { BattleStepFn } from '../../types';

export const defaultBattleSequence: BattleStepFn[] = [
  walkToMiddle,
  enemyAttack,
  playerHurt,
  playerSwordCharge,
  playerSwordAttack2,
  enemyHurt,
];
