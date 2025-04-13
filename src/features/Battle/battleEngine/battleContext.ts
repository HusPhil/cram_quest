// battleEngine/types.ts

export type BattleStepFn = (ctx: BattleContext) => (() => void) | void;

export type BattleContext = {
  next: () => void;

  // Animation
  setPlayerAction: (action: string) => void;
  setEnemyAction: (action: string) => void;
  setPlayerLoop: (loop: boolean) => void;
  setEnemyLoop: (loop: boolean) => void;

  // Movement
  setPlayerPosX: React.Dispatch<React.SetStateAction<number>>;
  setEnemyPosX: React.Dispatch<React.SetStateAction<number>>;
  getPlayerPosX: () => number;
  getEnemyPosX: () => number;

  // Z-index
  adjustZValues: (entity: 'enemy' | 'player') => void;
};
