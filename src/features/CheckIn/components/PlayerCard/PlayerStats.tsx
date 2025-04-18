import ProgressBar from './ProgressBar';
import TagLabel from '../../../../components/TagLabel';
import { memo } from 'react';

interface PlayerStatsProps {
	currentExp: number | undefined;
	nextLvlExp: number | undefined;
	currentLevel: number | undefined;
	playerName: string | undefined;
}

export function PlayerStats({
	currentExp = 0,
	nextLvlExp = 0,
	currentLevel = 0,
	playerName = '',
}: PlayerStatsProps) {
	return (
		<div className="space-y-2">
			<p className="w-full text-center">{playerName}</p>
			<span className="flex items-center justify-between text-xs ">
				<TagLabel
					info={`Lv. ${currentLevel}`}
					className="px-3 py-0.5 rounded-lg"
				/>
				<p>{`XP: ${currentExp}/${nextLvlExp}`}</p>
			</span>
			<ProgressBar value={currentExp} max={39792} />
		</div>
	);
}

export default memo(PlayerStats);
