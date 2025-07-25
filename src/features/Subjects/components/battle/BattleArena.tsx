import { memo, useEffect } from 'react';
import BattleTimer from './BattleTimer';
import CornerDecoration from '../../../../components/CornerDecoration';
import SpriteSheet from '../../../../components/SpriteSheet';
import { useBattleEngineStore } from '../../../Battle/stores/battleEngineStore';
import { useBattleSetup } from '../../../Battle/hooks/useBattleSetup';
import { BattleEngineControllers } from '../../hooks/battle/useBattleEngineControllers';
import { QuestRead } from '../../../../services/api/schema/quest_schema';
import { TbTargetArrow } from 'react-icons/tb';
import colors from '../../../../data/colors';

export const enemyPosOffSetX = 16;
export const arenaMiddle = 6 * 12;

interface BattleArenaProps {
	initializeBattleEngineControllers: (
		battleControllers: BattleEngineControllers
	) => void;
	duration: number;
	currentQuest: QuestRead;
}

export const BattleArena = ({
	initializeBattleEngineControllers,
	duration,
	currentQuest,
}: BattleArenaProps) => {
	useBattleSetup();

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

	useEffect(() => {
		initializeBattleEngineControllers({
			getNewEnemyFn: useBattleEngineStore.getState().getNewEnemy,
			queueCustomSceneFn:
				useBattleEngineStore.getState().queueCustomScene,
		});
	}, []);

	return (
		<div className={`flex flex-col w-[280px] items-center gap-4`}>
			<div className="w-full border rounded-md mb-3 p-2 flex gap-2 px-5 items-center justify-between border-accent bg-accent/15">
				<TbTargetArrow
					className="w-6 h-6 shrink-0"
					color={colors.accent}
				/>
				<p className="line-clamp-2 text-center text-accent">
					{currentQuest.description}
				</p>
				<TbTargetArrow
					className="w-6 h-6 shrink-0"
					color={colors.accent}
				/>
			</div>
			<div className="flex relative w-full h-[200px] overflow-hidden">
				<div className="absolute top-5 left-1/2 -translate-x-1/2">
					<BattleTimer duration={duration} />
				</div>

				{/* Corner Decorations */}
				<CornerDecoration />

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

export default memo(BattleArena);
