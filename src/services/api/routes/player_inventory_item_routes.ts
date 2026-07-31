const basePlayerInventoryRoute = '/player_inventory_items';

export const getPlayerInventoryEndRoute = (playerId: number) => {
	return `${basePlayerInventoryRoute}/player/${playerId}/inventory`;
};

export const getPlayerSkinsEndRoute = (playerId: number) => {
	return `${basePlayerInventoryRoute}/player/${playerId}/skins`;
};

export const getEquipPlayerSkinEndRoute = (profileId: number) => {
	return `${basePlayerInventoryRoute}/equip/skin/${profileId}`;
};

export const getUnequipPlayerSkinEndRoute = (profileId: number) => {
	return `${basePlayerInventoryRoute}/unequip/skin/${profileId}`;
};
