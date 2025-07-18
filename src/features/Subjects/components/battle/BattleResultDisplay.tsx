import React from 'react';
import { TbTrophy, TbFlame, TbTrophyFilled } from 'react-icons/tb';
import SpriteSheet from '../../../../components/SpriteSheet';

interface SpriteProps {
	characterAsset: string;
	frameCount: number;
	fps: number;
	row: number;
}

interface BattleResultDisplayProps {
	result: 'victory' | 'defeat';
	sprite: SpriteProps;
}

const BattleResultDisplay: React.FC<BattleResultDisplayProps> = ({
	result,
	sprite,
}) => {
	// Pick icon & colors based on result
	const isVictory = result === 'victory';
	const Icon = isVictory ? TbTrophyFilled : TbFlame;

	const color = isVictory ? '#22c55e' : '#ef4444'; // Tailwind's green-500 or red-500
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
		</div>
	);
};

export default BattleResultDisplay;
