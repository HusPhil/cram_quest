import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../../lib/axios/axiosInstance';
import { UseItemResponse } from '../../../../services/api/schema/player_inventory_item_schema';
import { getEquipPlayerSkinEndRoute } from '../../../../services/api/routes/player_inventory_item_routes';

export const useEquipPlayerSkin = () => {
	return useMutation({
		mutationFn: equipPlayerSkin,
	});
};

const equipPlayerSkin = async ({
	profileId,
	skinUrl,
}: {
	profileId: number;
	skinUrl: string;
}): Promise<UseItemResponse> => {
	const response = await axiosInstance.post(
		getEquipPlayerSkinEndRoute(profileId),
		{ skin_url: skinUrl },
		{ withCredentials: true }
	);
	if (response.status !== 200) {
		throw new Error('Failed to equip player skin');
	}

	return response.data;
};
