import ProgressBar from './ProgressBar';
import TagLabel from '../../../../components/TagLabel';
import { memo } from 'react';

interface PlayerStatsProps {
	currentExp: number;
	nextLvlExp: number;
	currentLevel: number;
	playerName: string;
}

export function PlayerStats({
	currentExp,
	nextLvlExp,
	currentLevel,
	playerName,
}: PlayerStatsProps) {
	return (
		<div className="space-y-2">
			<p className="w-full text-center">{playerName}</p>
			<span className="flex items-center justify-between text-xs ">
				{/* <span className="flex gap-2">
                <p>{`CacheWarrior`}</p>
                <LevelBadge currentLevel={1} playerTitle={""}/>    
            </span> */}
				<TagLabel
					info={`Lv. ${currentLevel}`}
					className="px-3 py-0.5 rounded-lg"
				/>
				<p>{`XP: ${currentExp}/${nextLvlExp}`}</p>
			</span>
			<ProgressBar value={20913} max={39792} />
		</div>
	);
}

export default memo(PlayerStats);
