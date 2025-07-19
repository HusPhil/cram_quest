import React from 'react';
import { LuTrophy, LuFlame } from 'react-icons/lu';
import SpriteSheet from '../../../../components/SpriteSheet';
import { BattleSessionEnd } from '../../../../services/api/schema/battle_session_schema';
import useBattleResultAnalysis from '../../hooks/battle/useBattleResultAnalysis';
import BattleResultXPGained from './BattleResultXPGained.tsx';
import BattleResultStats from './BattleResultStats.tsx';
import BattleResultContinue from './BattleResultContinue.tsx';
import colors from '../../../../data/colors.ts';
import { TbSwords } from 'react-icons/tb';

interface SpriteProps {
	characterAsset: string;
	frameCount: number;
	fps: number;
	row: number;
}

interface BattleResultDisplayProps {
	result: 'victory' | 'defeat';
	sprite: SpriteProps;
	battleCleanup: () => void;
	battleSessionResult?: BattleSessionEnd;
}

const BattleResultDisplay: React.FC<BattleResultDisplayProps> = ({
	result,
	sprite,
	battleCleanup,
	battleSessionResult,
}) => {
	const { duration } = useBattleResultAnalysis(battleSessionResult);

	// Pick icon & colors based on result
	const isVictory = result === 'victory';
	const Icon = TbSwords;

	const color = isVictory ? colors.success : colors.danger; // Tailwind's green-500 or red-500
	const borderColor = isVictory ? 'border-success' : 'border-danger';
	const bgColor = isVictory ? 'bg-success/15' : 'bg-danger/15';
	const textColor = isVictory ? 'text-success' : 'text-danger';

	return (
		<div className="w-full flex flex-col items-center">
			<div
				className={`w-full border rounded-md mb-3 p-2 px-5 flex items-center justify-between gap-2 ${borderColor} ${bgColor}`}
			>
				<Icon className="w-6 h-6 shrink-0" color={color} />
				<p className={`text-xl font-bold ${textColor}`}>
					{result.toUpperCase()}
				</p>
				<Icon className="w-6 h-6 shrink-0" color={color} />
			</div>

			<SpriteSheet
				src={sprite.characterAsset}
				frameHeight={48}
				frameWidth={48}
				frameCount={sprite.frameCount}
				fps={sprite.fps}
				frameRow={sprite.row}
				scale={2.5}
				loop
			/>

			{battleSessionResult ? (
				<>
					<BattleResultXPGained
						baseXp={battleSessionResult.base_xp}
						bonusXp={battleSessionResult.bonus_xp}
						result={result}
					/>

					<BattleResultStats
						result={result}
						base_xp={battleSessionResult.base_xp}
						bonus_xp={battleSessionResult.bonus_xp}
						streak_count={battleSessionResult.session_streak}
					/>
					<BattleResultContinue
						result={result}
						battleCleanUp={battleCleanup}
					/>
				</>
			) : (
				<>
					<p className="mt-3 opacity-50 text-white">
						Calculating results..
					</p>
				</>
			)}
		</div>
	);
};

export default BattleResultDisplay;
