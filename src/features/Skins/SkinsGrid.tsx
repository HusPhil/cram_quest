import { useGetPlayerSkins } from '../Subjects/hooks/battle/usGetPlayerSkins';
import { useUserPlayerStore } from '../Auth/stores/userPlayerStore/userPlayerStore';
import { PlayerInventoryItemRead } from '../../services/api/schema/player_inventory_item_schema';
import { useEquipPlayerSkin } from '../Subjects/hooks/battle/useEquipPlayerSkin';
import { toast } from 'react-toastify';
import { rarityConfig } from '../../data/configs';

interface SkinsGridItemProps {
	skin: PlayerInventoryItemRead;
	currentSkin: string | null;
	handleEquip?: (skinUrl: string) => void;
}

const SkinsGridItem = ({
	skin,
	handleEquip,
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
					src={`/cramquest/assets/images/items/skins/${skin.item.image_url}`}
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
					onClick={() => handleEquip?.(skin.item.equipped_image_url)}
					className={`w-full bg-accent text-secondary text-sm py-1 rounded font-rpg
                                 hover:opacity-75 transition-colors duration-200`}
				>
					<p>{isEquipped ? 'Equipped' : 'Equip'}</p>
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

	const handleEquipSkin = (skinUrl: string) => {
		if (!currentProfileId) {
			console.error('No profile ID found');
			return;
		}

		equipSkinMutate.mutate(
			{ profileId: currentProfileId, skinUrl },
			{
				onSuccess: () => {
					setCurrentPlayerSkinUrl(skinUrl);
					toast.success('Skin equipped successfully', {
						toastId: 'equip-skin-success',
					});
				},
				onError: (error: any) => {
					console.error('Failed to equip skin:', error);
					toast.error('Failed to equip skin');
				},
			}
		);
	};

	return (
		<div className="flex flex-1 flex-col">
			<h2 className="font-rpg text-2xl text-accent mb-6 text-center">
				Available Skins
			</h2>
			{!player_skins.isLoading ? (
				<div className="relative flex-1">
					<div className="absolute inset-0 overflow-y-auto scroll-smooth flex justify-center no-scrollbar">
						<div className="h-full w-full max-w-[1200px] flex flex-col py-3 px-3.5 md:py-5 md:px-7">
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-7">
								{player_skins?.data?.map((skin) => (
									<SkinsGridItem
										key={skin.id}
										skin={skin}
										currentSkin={currentPlayerSkinUrl}
										handleEquip={handleEquipSkin}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			) : (
				<p>loading</p>
			)}
		</div>
	);
}

export default SkinsGrid;
