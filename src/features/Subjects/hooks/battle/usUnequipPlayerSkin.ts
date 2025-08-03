import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../../lib/axios/axiosInstance';
import { UseItemResponse } from '../../../../services/api/schema/player_inventory_item_schema';
import { getEquipPlayerSkinEndRoute } from '../../../../services/api/routes/player_inventory_item_routes';

export const usUnequipPlayerSkin = () => {
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
		getEquipPlayerSkinEndRoute(profileId),
		{},
		{ withCredentials: true }
	);
	if (response.status !== 200) {
		throw new Error('Failed to unequip player skin');
	}

	return response.data;
};
