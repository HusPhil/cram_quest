import { rarityConfig } from '../data/configs';
import { PlayerSkin } from '../features/Battle/configs/spritesheetConfig';
import useCharacterAnimation from '../features/Battle/hooks/useCharacterAnimation';
import { RewardItemRead } from '../services/api/schema/reward_schema';
import { parsePlayerAvatar } from '../utils/parsePlayerAvatar';
import SpriteSheet from './SpriteSheet';

export default function ItemRewardDisplay({
	rewardItem,
}: {
	rewardItem: RewardItemRead;
}) {
	const { playerClass, playerSkin } = parsePlayerAvatar(
		rewardItem.equipped_image_url
	);

	const {
		getAnimationParams: getPlayerAnimation,
		setCurrentAction: setPlayerCurrentAction,
	} = useCharacterAnimation('player', playerClass, playerSkin as PlayerSkin);

	return (
		<div className="flex flex-col items-center w-full">
			<div className="grid grid-cols-2 gap-3 px-7 w-full mt-3">
				<div className="flex items-center justify-center py-1 px-7 bg-success/5 rounded-md">
					<p className="text-center text-accent uppercase break-words">
						{rewardItem.name.replace(/_/g, ' ')}
					</p>
				</div>
				<div className="flex items-center justify-center py-1 px-7 bg-success/5 rounded-md">
					<p className="text-center text-accent uppercase break-words">
						{rewardItem.rarity}
					</p>
				</div>
			</div>

			<div
				className={`flex-1 flex justify-center p-2 ${
					rarityConfig[rewardItem.rarity].glowClass
				} shadow-lg rounded-full my-3`}
			>
				<SpriteSheet
					src={getPlayerAnimation().characterAsset}
					frameHeight={48}
					frameWidth={48}
					frameCount={getPlayerAnimation().frameCount}
					fps={getPlayerAnimation().fps}
					frameRow={getPlayerAnimation().row}
					scale={2.5}
					loop
				/>
			</div>
		</div>
	);
}
