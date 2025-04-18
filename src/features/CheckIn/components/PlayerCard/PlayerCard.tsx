import { memo } from 'react';
import RankTitle from '../../../../components/RankTitle';
import PlayerSummary from './PlayerSummary';
import PlayerStats from './PlayerStats';
import {
	PlayerClass,
	PlayerSkin,
} from '../../../Battle/configs/spritesheetConfig';

interface PlayerCardProps {
	playerClass: PlayerClass;
	playerSkin: PlayerSkin;
	currentScreenSize: string;
	playerTitle: string | undefined;
	playerName: string | undefined;
	isLoading: boolean;
	currentExp: number | undefined;
	nextLvlExp: number | undefined;
	currentLevel: number | undefined;
	userError: Error | null;
	playerError: Error | null;
	profileError: Error | null;
}

export function PlayerCard({
	playerClass,
	playerSkin,
	currentScreenSize,
	playerTitle,
	playerName,
	isLoading,
	currentExp,
	nextLvlExp,
	currentLevel,
	userError,
	playerError,
	profileError,
}: PlayerCardProps) {
	return (
		<>
			<div
				className="flex items-center flex-col lg:flex-row lg:justify-around px-3 bg-accent/0 rounded-lg shadow-md"
				title="Player Card"
			>
				<div className="flex-1 w-full">
					<RankTitle
						text={playerError ? '! ERROR !' : playerTitle}
						color={playerError ? 'error' : 'bronze'}
					/>
				</div>
				<div className="flex-2 flex-grow w-full">
					<PlayerSummary
						playerClass={playerClass}
						playerSkin={playerSkin}
						currentScreenSize={currentScreenSize}
						isLoading={isLoading}
						userError={userError}
						playerError={playerError}
						profileError={profileError}
					/>
				</div>
				<div className="flex-1 w-full">
					<PlayerStats
						currentExp={currentExp}
						nextLvlExp={nextLvlExp}
						currentLevel={currentLevel}
						playerName={playerName}
					/>
				</div>
			</div>
		</>
	);
}

export default memo(PlayerCard);
