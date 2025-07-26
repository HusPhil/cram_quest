import { memo } from 'react';
import SpriteSheet from '../../../../components/SpriteSheet';
import { useBattleEngineStore } from '../../../Battle/stores/battleEngineStore';
import { useBattleSetup } from '../../../Battle/hooks/useBattleSetup';

interface BossBattleArenaProps {}

export const BossBattleArena = ({}: BossBattleArenaProps) => {
	const isBossBattle = true;
	useBattleSetup(isBossBattle);

	const playerPosX = useBattleEngineStore((state) => state.playerPosX);
	const playerZ = useBattleEngineStore((state) => state.playerZ);
	const playerLoop = useBattleEngineStore((state) => state.playerLoop);

	const enemyPosX = useBattleEngineStore((state) => state.enemyPosX);
	const enemyZ = useBattleEngineStore((state) => state.enemyZ);
	const enemyLoop = useBattleEngineStore((state) => state.enemyLoop);

	const getPlayerAnimation = useBattleEngineStore(
		(state) => state.getPlayerAnimation
	);
	const getEnemyAnimation = useBattleEngineStore(
		(state) => state.getEnemyAnimation
	);

	return (
		<div className={`flex flex-col w-[280px] items-center gap-4`}>
			<div className="flex relative w-full h-[120px] border-text/30 overflow-hidden">
				{/* needs to have div to be relative to */}
				{/* Player (fixed on the left) */}
				<SpriteSheet
					style={{
						position: 'absolute',
						zIndex: playerZ,
						left: `${playerPosX}px`,
						bottom: -15,
					}}
					src={getPlayerAnimation().characterAsset}
					frameHeight={48}
					frameWidth={48}
					frameCount={getPlayerAnimation().frameCount}
					fps={getPlayerAnimation().fps}
					frameRow={getPlayerAnimation().row}
					scale={2.5}
					loop={playerLoop}
				/>

				{/* Enemy (can move horizontally) */}
				<SpriteSheet
					style={{
						position: 'absolute',
						zIndex: enemyZ,
						left: `${enemyPosX}px`,
						transform: 'scaleX(-1)',
						bottom: 20,
					}}
					src={getEnemyAnimation().characterAsset}
					frameHeight={48}
					frameWidth={64}
					frameCount={getEnemyAnimation().frameCount}
					fps={getEnemyAnimation().fps}
					frameRow={getEnemyAnimation().row}
					scale={2.5}
					loop={enemyLoop}
				/>
			</div>
		</div>
	);
};

export default memo(BossBattleArena);
