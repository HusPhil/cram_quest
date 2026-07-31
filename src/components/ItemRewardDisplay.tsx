import { rarityConfig } from '../data/configs';
import { PlayerSkin } from '../features/Battle/configs/spritesheetConfig';
import useCharacterAnimation from '../features/Battle/hooks/useCharacterAnimation';
import { RewardItemRead } from '../services/api/schema/reward_schema';
import { formatSnakeCaseName } from '../utils/formatSnakeCaseName';
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

	const { getAnimationParams: getPlayerAnimation } = useCharacterAnimation(
		'player',
		playerClass,
		playerSkin as PlayerSkin
	);

	const rarity = rarityConfig[rewardItem.rarity];

	return (
		<div className="flex flex-col items-center w-full">
			<p
				className={`${rarity.textColor} font-rpg text-center break-words`}
			>
				{formatSnakeCaseName(rewardItem.name)}
			</p>

			<div
				className={`flex-1 flex justify-center p-2 ${rarity.glowClass} shadow-lg rounded-full my-3`}
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
