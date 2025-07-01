import { memo } from 'react';
import SpriteSheet from '../../../../components/SpriteSheet';
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
	userError: Error | null;
	playerError: Error | null;
	profileError: Error | null;
}

export function PlayerSummary({
	playerClass,
	playerSkin,
	currentScreenSize,
	isLoading,
	userError,
	playerError,
	profileError,
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
		<div className="flex justify-center items-center flex-1 w-full">
			<div
				className="flex flex-col justify-center items-center mx-3"
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
					isError={
						(userError || playerError || profileError) !== null
					}
					onAnimationCycleComplete={handleAnimationComplete}
					scale={currentScreenSize !== 'LARGE' ? 2.3 : 2.5}
				/>
			</div>
		</div>
	);
}

export default memo(PlayerSummary);
