import React, { useEffect, useRef, useState } from 'react';
import BattleTimer from './BattleTimer';
import SpriteSheet from '../../../components/SpriteSheet';
import useCharacterAnimation from '../hooks/useCharacterAnimation';

export default function BattleArena() {
  const {
    getAnimationParams: getPlayerAnimation,
    setCurrentAction: setPlayerCurrentAction,
  } = useCharacterAnimation('player', 'default', 'default_3');

  const {
    getAnimationParams: getEnemyAnimation,
    setCurrentAction: setEnemyCurrentAction,
  } = useCharacterAnimation('skeleton');

  const [enemyPosX, setEnemyPosX] = useState(6); // Enemy starts more to the right
  const [enemyLooping, setEnemyLooping] = useState(true);

  useEffect(() => {
    console.log(enemyPosX)
    if(enemyPosX <= -34 && enemyLooping) {
      setEnemyCurrentAction('attack');
      setEnemyLooping(false);
      setSceneStep(prev => prev + 1);
    }
    else {
      setEnemyCurrentAction('walk');
      setEnemyLooping(true)
    }
  }, [enemyPosX])


  useEffect(() => {
    setEnemyCurrentAction('walk');
  
    const interval = setInterval(() => {
      setEnemyPosX(prev => {
        if (prev <= -34) {
          return -34; // Move back to the starting position
        }
        // Optional: clamp position to avoid going offscreen
        return prev - 5; // Move left toward the player
      });
    }, 50); // adjust speed by interval
  
    return () => clearInterval(interval);
  }, []);

  const [sceneStep, setSceneStep] = useState(0);

  useEffect(() => {

    if(sceneStep === 0) {
      console.log("do the first animation")
    }
    else if(sceneStep === 1) {
      console.log("do the second animation")
      setSceneStep(prev => prev + 1);
    }
    else if(sceneStep === 2) {
      console.log("done")
    }

  }, [sceneStep])


  return (
    <div className="flex flex-col items-center gap-4">
      <BattleTimer duration={77} />

      <div className="flex relative w-full h-[200px] border bg-black overflow-hidden">
        {/* Player (fixed on the left) */}
        <SpriteSheet
          className="absolute z-20"
          style={{ left: '0px', bottom: 0 }}
          src={getPlayerAnimation().characterAsset}
          frameHeight={48}
          frameWidth={48}
          frameCount={getPlayerAnimation().frameCount}
          fps={getPlayerAnimation().fps}
          frameRow={getPlayerAnimation().row}
          scale={2.5}
          offsetY={14}
        />

        {/* Enemy (can move horizontally) */}
        <SpriteSheet
          className="absolute z-30"
          style={{
            left: `${enemyPosX}px`,
            bottom: 0,
            transform: 'scaleX(-1)',
          }}
          src={getEnemyAnimation().characterAsset}
          frameWidth={64}
          frameHeight={48}
          frameCount={getEnemyAnimation().frameCount}
          fps={getEnemyAnimation().fps}
          frameRow={getEnemyAnimation().row}
          scale={2.5}
          loop={enemyLooping}
        />
      </div>
    </div>
  );
}
