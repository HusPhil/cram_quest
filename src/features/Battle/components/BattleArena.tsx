import { memo, RefObject } from 'react';
import BattleTimer from './BattleTimer';
import SpriteSheet from '../../../components/SpriteSheet';
import { AnimationParams } from '../hooks/useCharacterAnimation';
import CornerDecoration from '../../../components/CornerDecoration';

export const enemyPosOffSetX = 16;
export const arenaMiddle = 6 * 12;

interface BattleArenaProps {
	playerZ: number;
	playerPosX: number;
	playerLoop: boolean;
	enemyZ: number;
	enemyPosX: number;
	enemyLoop: boolean;
	getEnemyAnimation: () => AnimationParams;
	getPlayerAnimation: () => AnimationParams;
}

export const BattleArena = ({
	playerZ,
	playerPosX,
	playerLoop,
	enemyZ,
	enemyPosX,
	enemyLoop,
	getEnemyAnimation,
	getPlayerAnimation,
}: BattleArenaProps) => {
	
	return (
		<div className={`flex flex-col w-[280px] items-center gap-4`}>
			<div className="flex relative w-full h-[200px] overflow-hidden ">
				<div className="absolute top-5 left-1/2 -translate-x-1/2">
					<BattleTimer duration={77} />
				</div>

				{/* Corner Decorations */}
				<CornerDecoration />

				{/* Player (fixed on the left) */}
				<SpriteSheet
					style={{
						position: 'absolute',
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
					style={{
						position: 'absolute',
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
};

export default memo(BattleArena);
