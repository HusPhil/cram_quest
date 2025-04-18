import { memo } from 'react';
import SpriteSheet from '../../../../components/SpriteSheet';
import StatCard from '../../../../components/StatCard';
import useCharacterAnimation from '../../../Battle/hooks/useCharacterAnimation';
import {
	PlayerClass,
	PlayerSkin,
} from '../../../Battle/configs/spritesheetConfig';

interface PlayerSummaryProps {
	playerClass: PlayerClass;
	playerSkin: PlayerSkin;
	currentScreenSize: string;
	isLoading: boolean;
}

export function PlayerSummary({
	playerClass,
	playerSkin,
	currentScreenSize,
	isLoading,
}: PlayerSummaryProps) {
	const {
		getAnimationParams: getPlayerAnimationParams,
		setCurrentAction,
		currentAction,
	} = useCharacterAnimation('player', playerClass, playerSkin);

	const handlePlayerClick = () => {
		if (currentAction == 'hurt') return;
		setCurrentAction('hurt');
	};

	const handleAnimationComplete = () => {
		if (currentAction == 'idle') return;
		setCurrentAction('idle');
	};

	return (
		<div className="flex justify-between items-center flex-1 w-full">
			{/* <div className='flex flex-2 w-full items-center justify-end md:justify-center'>
            <StatCard label={"Best Streak"} value={0}/>
        </div> */}
			<div
				className="flex flex-1 flex-col justify-center items-center mx-3"
				onClick={handlePlayerClick}
			>
				<SpriteSheet
					src={getPlayerAnimationParams().characterAsset}
					frameRow={getPlayerAnimationParams().row}
					fps={getPlayerAnimationParams().fps}
					frameCount={getPlayerAnimationParams().frameCount}
					frameWidth={48}
					frameHeight={48}
					isLoading={isLoading}
					onAnimationCycleComplete={handleAnimationComplete}
					scale={currentScreenSize !== 'LARGE' ? 2 : 2.3}
				/>
			</div>
			{/* <div className='flex flex-2 w-full items-center justify-start md:justify-center'>
            <StatCard label={"Battles Won"} value={0}/>
        </div> */}
		</div>
	);
}

export default memo(PlayerSummary);
