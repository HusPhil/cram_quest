import { BASE_URL } from '../api';

const basePlayerInventoryRoute = 'player_inventory_items';

export const getPlayerInventoryEndRoute = (playerId: number) => {
	return `${BASE_URL}/${basePlayerInventoryRoute}/player/${playerId}/inventory`;
};

export const getPlayerSkinsEndRoute = (playerId: number) => {
	return `${BASE_URL}/${basePlayerInventoryRoute}/player/${playerId}/skins`;
};

export const getEquipPlayerSkinEndRoute = (profileId: number) => {
	return `${BASE_URL}/${basePlayerInventoryRoute}/equip/skin/${profileId}`;
};

export const getUnequipPlayerSkinEndRoute = (profileId: number) => {
	return `${BASE_URL}/${basePlayerInventoryRoute}/unequip/skin/${profileId}`;
};
