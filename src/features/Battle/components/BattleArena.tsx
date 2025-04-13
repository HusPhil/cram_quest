import React, { useCallback, useEffect, useRef, useState } from 'react';
import BattleTimer from './BattleTimer';
import SpriteSheet from '../../../components/SpriteSheet';
import useCharacterAnimation, { AnimationStateType } from '../hooks/useCharacterAnimation';
import { useBattleAnimation } from '../hooks/useBattleAnimation';
import { useBattleSequence } from '../hooks/useBattleSequence';
import { useBattleEngine } from '../battleEngine/useBattleEngine';
import { defaultBattleSequence } from '../battleEngine/animationSequences/defaultSequence';

export default function BattleArena() {
	const {
		getAnimationParams: getPlayerAnimation,
		setCurrentAction: setPlayerCurrentAction,
	} = useCharacterAnimation('player', 'default', 'default_3');

	const {
		getAnimationParams: getEnemyAnimation,
		setCurrentAction: setEnemyCurrentAction,
	} = useCharacterAnimation('orc');

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
		setLoop
	} = useBattleEngine(
		defaultBattleSequence
	)

	useEffect(() => {
		setPlayerActionRef.current = (action: AnimationStateType) => setPlayerCurrentAction(action);
  		setEnemyActionRef.current = (action: AnimationStateType) => setEnemyCurrentAction(action);
		setLoop(true)
		startBattle();
	}, []);

	return (
		<div className="flex flex-col items-center gap-4">
			<BattleTimer duration={77} />

			<div className="flex relative w-full h-[200px]  overflow-hidden">
				{/* Player (fixed on the left) */}
				<SpriteSheet
					style={{
						zIndex: playerZ,
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
					loop={playerLoop}
					offsetY={14}
				/>

				{/* Enemy (can move horizontally) */}
				<SpriteSheet
					style={{
						zIndex: enemyZ,
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
					loop={enemyLoop}
				/>
			</div>
		</div>
	);
}
