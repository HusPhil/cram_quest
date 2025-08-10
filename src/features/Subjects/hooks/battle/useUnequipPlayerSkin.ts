import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../../lib/axios/axiosInstance';
import { UseItemResponse } from '../../../../services/api/schema/player_inventory_item_schema';
import {
	getEquipPlayerSkinEndRoute,
	getUnequipPlayerSkinEndRoute,
} from '../../../../services/api/routes/player_inventory_item_routes';

export const useUnequipPlayerSkin = () => {
	return useMutation({
		mutationFn: unequipPlayerSkin,
	});
};

const unequipPlayerSkin = async ({
	profileId,
}: {
	profileId: number;
}): Promise<UseItemResponse> => {
	const response = await axiosInstance.post(
		getUnequipPlayerSkinEndRoute(profileId),
		{},
		{ withCredentials: true }
	);
	if (response.status !== 200) {
		throw new Error('Failed to unequip player skin');
	}

	return response.data;
};
