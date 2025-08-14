import { useGetPlayerSkins } from '../Subjects/hooks/battle/useGetPlayerSkins';
import { useUserPlayerStore } from '../Auth/stores/userPlayerStore/userPlayerStore';
import { PlayerInventoryItemRead } from '../../services/api/schema/player_inventory_item_schema';
import { useEquipPlayerSkin } from '../Subjects/hooks/battle/useEquipPlayerSkin';
import { rarityConfig } from '../../data/configs';
import { useUnequipPlayerSkin } from '../Subjects/hooks/battle/useUnequipPlayerSkin';
import SkinsGridSkeleton from '../../components/Skeletons/SkinsGridSkeleton';
import EmptyListNote from '../../components/EmptyListNote';
import { toast } from '../../lib/toastify/charLimitedToast';

interface SkinsGridItemProps {
	skin: PlayerInventoryItemRead;
	currentSkin: string | null;
	handleEquip?: (skinUrl: string) => void;
	handleUnequipSkin?: () => void;
}

const SkinsGridItem = ({
	skin,
	handleEquip,
	handleUnequipSkin,
	currentSkin,
}: SkinsGridItemProps) => {
	const config = rarityConfig[skin.item.rarity];

	const isEquipped = currentSkin === skin.item.equipped_image_url;

	return (
		<div
			className={`group relative flex flex-col bg-secondary/50 border rounded-lg cursor-pointer overflow-hidden
                         transition-all duration-300 ease-in-out hover:opacity-75 shadow-lg
                         ${config.glowClass} ${config.borderColor}`}
		>
			<div className="flex-1 flex justify-center p-2">
				<img
					src={`/assets/images/items/skins/${skin.item.image_url}`}
					alt={skin.item.name}
					className={`hover:drop-shadow-2xl transition-all duration-300  w-[120px] rounded-full aspect-square object-cover  [image-rendering:pixelated] 
                                ${config.dropShadow}`} // Add the glowClass here
				/>
			</div>

			<div className="flex flex-col flex-grow pb-5 px-3 space-y-2">
				<p
					className="font-bold font-rpg text-accent text-sm flex-grow text-center capitalize"
					style={{ minHeight: '2.5rem' }}
				>
					{skin.item.name.replace(/_/g, ' ')}
				</p>
				<button
					onClick={() => {
						if (isEquipped) {
							handleUnequipSkin?.();
						} else {
							handleEquip?.(skin.item.equipped_image_url);
						}
					}}
					className={`w-full bg-accent text-secondary text-sm py-1 rounded font-rpg
                                 hover:opacity-75 transition-colors duration-200 disabled:cursor-not-allowed`}
				>
					<p>{isEquipped ? 'Unequip' : 'Equip'}</p>
				</button>
			</div>
		</div>
	);
};

function SkinsGrid() {
	const currentPlayerId = useUserPlayerStore((state) => state.playerId);
	const currentProfileId = useUserPlayerStore((state) => state.profileId);
	const currentPlayerSkinUrl = useUserPlayerStore((state) => state.skinUrl);
	const setCurrentPlayerSkinUrl = useUserPlayerStore(
		(state) => state.setSkinUrl
	);
	const player_skins = useGetPlayerSkins(currentPlayerId!);

	const equipSkinMutate = useEquipPlayerSkin();
	const unequipSkinMutate = useUnequipPlayerSkin();

	const handleEquipSkin = (skinUrl: string) => {
		if (!currentProfileId) {
			return;
		}

		equipSkinMutate.mutate(
			{ profileId: currentProfileId, skinUrl },
			{
				onSuccess: () => {
					setCurrentPlayerSkinUrl(skinUrl);
					toast.success('Equipped successfully', {
						toastId: 'equip-skin-success',
					});
				},
				onError: () => {
					toast.error('Equipping skin failed', {
						toastId: 'equip-skin-error',
					});
				},
			}
		);
	};

	const handleUnequipSkin = () => {
		if (!currentProfileId) {
			return;
		}

		unequipSkinMutate.mutate(
			{ profileId: currentProfileId },
			{
				onSuccess: () => {
					setCurrentPlayerSkinUrl(null);
					toast.success('Skin unequipped successfully', {
						toastId: 'unequipped-skin-success',
					});
				},
				onError: () => {
					toast.error('Unequipping skin failed', {
						toastId: 'unequipped-skin-error',
					});
				},
			}
		);
	};

	return (
		<div className="flex flex-1 flex-col">
			{player_skins.isLoading ? (
				<SkinsGridSkeleton />
			) : (
				<>
					<h2 className="font-rpg text-2xl text-accent mb-6 text-center">
						Available Skins
					</h2>
					{player_skins.data && player_skins.data.length > 0 ? (
						<div className="relative flex-1">
							<div className="absolute inset-0 overflow-y-auto scroll-smooth flex justify-center no-scrollbar">
								<div className="h-full w-full max-w-[1200px] flex flex-col py-3 px-3.5 md:py-5 md:px-7">
									<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-7">
										{player_skins?.data?.map((skin) => (
											<SkinsGridItem
												key={skin.id}
												skin={skin}
												currentSkin={
													currentPlayerSkinUrl
												}
												handleUnequipSkin={
													handleUnequipSkin
												}
												handleEquip={handleEquipSkin}
											/>
										))}
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="flex justify-center items-center h-full w-full">
							<EmptyListNote
								message="No skins found,"
								hint="Go win some boss battles!"
							/>
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default SkinsGrid;
