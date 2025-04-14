import { useEffect, useRef, useState } from 'react';
import { BattleContext, BattleStepFn } from './types';
import { AnimationStateType } from '../hooks/useCharacterAnimation';
import { enemyPosOffSetX } from '../components/BattleArena';

export const useBattleEngine = (steps: BattleStepFn[]) => {
  

  const [stepIndex, setStepIndex] = useState(-1);
  const [loop, setLoop] = useState(false);

  const [playerPosX, setPlayerPosX] = useState(0);
  const [enemyPosX, setEnemyPosX] = useState(0 - enemyPosOffSetX);

  const [playerLoop, setPlayerLoop] = useState(true);
  const [enemyLoop, setEnemyLoop] = useState(true);

  const [playerZ, setPlayerZ] = useState(99);
  const [enemyZ, setEnemyZ] = useState(100);

  const setPlayerActionRef = useRef<(action: AnimationStateType) => void>(() => {});
  const setEnemyActionRef = useRef<(action: AnimationStateType) => void>(() => {});

  const cleanupRef = useRef<() => void | undefined>(undefined);

  const playerPosXRef = useRef(playerPosX);
  const enemyPosXRef = useRef(enemyPosX);

  const getPlayerPosX = () => playerPosXRef.current;
  const getEnemyPosX = () => enemyPosXRef.current;

  const adjustZValues = (entity: 'enemy' | 'player') => {
    if (entity === 'enemy' && enemyZ <= playerZ) {
      setPlayerZ((p) => p - 10);
      setEnemyZ((e) => e + 10);
    } else if (entity === 'player' && playerZ <= enemyZ) {
      setPlayerZ((p) => p + 10);
      setEnemyZ((e) => e - 10);
    }
  };

  const next = () => {
    setStepIndex((prevIndex) => {
      if (prevIndex + 1 >= steps.length) {
        return loop ? 0 : prevIndex + 1;
      }
      return prevIndex + 1;
    });
  };

  // Start battle
  const start = () => setStepIndex(0);

  // === Provide current context to steps ===
  const context: BattleContext = {
    next,
    setPlayerAction: (a) => setPlayerActionRef.current(a),
    setEnemyAction: (a) => setEnemyActionRef.current(a),
    setPlayerLoop,
    setEnemyLoop,
    setPlayerPosX,
    setEnemyPosX,
    getPlayerPosX,
    getEnemyPosX,
    adjustZValues,
  };

  // === Run current step ===
  useEffect(() => {
    if (stepIndex < 0 || stepIndex >= steps.length) return;
    cleanupRef.current?.(); // cleanup last step

    const stepFn = steps[stepIndex];
    const cleanup = stepFn(context);
    cleanupRef.current = cleanup ?? undefined;
  }, [stepIndex]);

  useEffect(() => {
    playerPosXRef.current = playerPosX;
  }, [playerPosX]);

  useEffect(() => {
    enemyPosXRef.current = enemyPosX;
  }, [enemyPosX]);

  return {
    startBattle: start,
    playerPosX,
    enemyPosX,
    playerLoop,
    enemyLoop,
    playerZ,
    enemyZ,
    setPlayerActionRef,
    setEnemyActionRef,
    setLoop,       
    isLooping: loop,
  };
};
