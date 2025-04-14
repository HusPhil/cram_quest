import { useEffect } from 'react';
import BattleTimer from './BattleTimer';
import SpriteSheet from '../../../components/SpriteSheet';
import useCharacterAnimation, { AnimationStateType } from '../hooks/useCharacterAnimation';
import { useBattleEngine } from '../battleEngine/useBattleEngine';
import { killEnemySequence } from '../battleEngine/scenes/killEnemy/killEnemySequence';
import { defaultBattleSequence } from '../battleEngine/scenes/default/defaultSequence';

export const enemyPosOffSetX = 16
export const arenaMiddle = (6 * 12)

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
		queueCustomScene,
		customSceneActiveRef,
		setLoop
	} = useBattleEngine(
		// killEnemySequence
		defaultBattleSequence
		// []
	)
	useEffect(() => {
		const handleKeyUp = (e: KeyboardEvent) => {
			console.log(e.key)
			if (e.key === "a") {
				queueCustomScene(killEnemySequence);
			}
		};
		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keyup', handleKeyUp);
		};
	},[]);
	


	useEffect(() => {
		setPlayerActionRef.current = (action: AnimationStateType) => setPlayerCurrentAction(action);
  		setEnemyActionRef.current = (action: AnimationStateType) => setEnemyCurrentAction(action);
		setLoop(true)
		startBattle();
	}, []);

	return (
		<div className={`flex flex-col w-[280px] items-center gap-4 ${customSceneActiveRef.current ? 'border' : ''}`}>

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
				// className='border'
					style={{
						position: "absolute",
						zIndex: playerZ,
						left: `${playerPosX}px`,
						bottom: 30,
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
				// className='border'
					style={{
						position: "absolute",
						zIndex: enemyZ,
						left: `${enemyPosX}px`,
						transform: 'scaleX(-1)',
						bottom: 30,
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
