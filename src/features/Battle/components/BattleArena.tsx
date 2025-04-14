import React, { useCallback, useEffect, useRef, useState } from 'react';
import BattleTimer from './BattleTimer';
import SpriteSheet from '../../../components/SpriteSheet';
import useCharacterAnimation, { AnimationStateType } from '../hooks/useCharacterAnimation';
import { useBattleAnimation } from '../hooks/useBattleAnimation';
import { useBattleSequence } from '../hooks/useBattleSequence';
import { useBattleEngine } from '../battleEngine/useBattleEngine';
import { defaultBattleSequence } from '../battleEngine/animationSequences/defaultSequence';
import { killEnemySequence } from '../battleEngine/animationSequences/killEnemySequence';

export default function BattleArena() {
	const {
		getAnimationParams: getPlayerAnimation,
		setCurrentAction: setPlayerCurrentAction,
	} = useCharacterAnimation('player', 'default', 'default_2');

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
		killEnemySequence
	)

	useEffect(() => {
		setPlayerActionRef.current = (action: AnimationStateType) => setPlayerCurrentAction(action);
  		setEnemyActionRef.current = (action: AnimationStateType) => setEnemyCurrentAction(action);
		setLoop(true)
		startBattle();
	}, []);

	return (
		<div className="flex flex-col w-[280px] items-center gap-4">

			<div className="flex relative w-full h-[200px] overflow-hidden ">

			<div className='absolute top-5 left-1/2 -translate-x-1/2'>
				<BattleTimer duration={77} />
			</div>
			
			{/* Corner Decorations */}
			<div className="absolute top-0 left-0 w-16 h-16">
				<div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-accent/80 to-transparent" />
				<div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-accent/80 to-transparent" />
			</div>
			<div className="absolute top-0 right-0 w-16 h-16">
				<div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-accent/80 to-transparent" />
				<div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-accent/80 to-transparent" />
			</div>
			<div className="absolute bottom-0 left-0 w-16 h-16">
				<div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-accent/80 to-transparent" />
				<div className="absolute bottom-0 left-0 h-full w-[1px] bg-gradient-to-t from-accent/80 to-transparent" />
			</div>
			<div className="absolute bottom-0 right-0 w-16 h-16">
				<div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-accent/80 to-transparent" />
				<div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-accent/80 to-transparent" />
			</div>

				{/* Player (fixed on the left) */}
				<SpriteSheet
					style={{
						zIndex: playerZ,
						right: `${playerPosX}px`,
						bottom: -30,
					}}
					src={getPlayerAnimation().characterAsset}
					frameHeight={48}
					frameWidth={48}
					frameCount={getPlayerAnimation().frameCount}
					fps={getPlayerAnimation().fps}
					frameRow={getPlayerAnimation().row}
					scale={2.5}
					loop={playerLoop}
					offsetY={13}
				/>

				{/* Enemy (can move horizontally) */}
				<SpriteSheet
					style={{
						zIndex: enemyZ,
						left: `${enemyPosX}px`,
						bottom: -30,
						transform: 'scaleX(-1)',
					}}
					src={getEnemyAnimation().characterAsset}
					frameWidth={64}
					frameHeight={48}
					frameCount={getEnemyAnimation().frameCount}
					fps={getEnemyAnimation().fps}
					frameRow={getEnemyAnimation().row}
					scale={2.5}
					offsetY={-0.5}
					loop={enemyLoop}
				/>
			</div>
		</div>
	);
}
