import React, { useCallback, useEffect, useRef, useState } from 'react';
import BattleTimer from './BattleTimer';
import SpriteSheet from '../../../components/SpriteSheet';
import useCharacterAnimation from '../hooks/useCharacterAnimation';
import { useBattleAnimation } from '../hooks/useBattleAnimation';
import { useBattleSequence } from '../hooks/useBattleSequence';

export default function BattleArena() {
	const {
		getAnimationParams: getPlayerAnimation,
		setCurrentAction: setPlayerCurrentAction,
	} = useCharacterAnimation('player', 'default', 'default_3');

	const {
		getAnimationParams: getEnemyAnimation,
		setCurrentAction: setEnemyCurrentAction,
	} = useCharacterAnimation('skeleton');

	// const {
	//   sceneStep,
	//   enemyPosX, playerPosX,
	//   enemyAnimationLoop, playerAnimationLoop
	// } = useBattleAnimation(
	//   setEnemyCurrentAction,
	//   setPlayerCurrentAction
	// )

  const onPlayerAnimationCycleComplete = useCallback(() => {
    // console.log('Player animation cycle complete');
  }, [])

  const onEnemyAnimationCycleComplete = useCallback(() => {
    // console.log('Enemy animation cycle complete');
  }, [])

	const { startBattle, step, enemyPosX, enemyLoop, playerLoop, playerPosX } =
		useBattleSequence(setPlayerCurrentAction, setEnemyCurrentAction);

	useEffect(() => {
		startBattle();
	}, []);

	return (
		<div className="flex flex-col items-center gap-4">
			<BattleTimer duration={77} />

			<div className="flex relative w-full h-[200px] border bg-black overflow-hidden">
				{/* Player (fixed on the left) */}
				<SpriteSheet
					className="absolute z-20"
					style={{
						right: `${playerPosX}px`,
						bottom: 0,
					}}
					src={getPlayerAnimation().characterAsset}
					frameHeight={48}
					frameWidth={48}
					frameCount={getPlayerAnimation().frameCount}
					fps={getPlayerAnimation().fps}
					frameRow={getPlayerAnimation().row}
					scale={2.5}
          onAnimationCycleComplete={onPlayerAnimationCycleComplete}
					loop={playerLoop}
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
          onAnimationCycleComplete={onEnemyAnimationCycleComplete}
					scale={2.5}
					loop={enemyLoop}
				/>
			</div>
		</div>
	);
}
