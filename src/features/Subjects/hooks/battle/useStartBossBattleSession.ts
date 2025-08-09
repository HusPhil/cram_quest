import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../../lib/axios/axiosInstance';
import { BossBattleEndRead } from '../../../../services/api/schema/boss_battle_status_schema';
import { getStartBossBattleSessionEndRoute } from '../../../../services/api/routes/boss_battle_status_routes';

export const useStartBossBattleSession = () => {
	return useMutation({
		mutationFn: startBattleSession,
	});
};

const startBattleSession = async ({
	bossBattleId,
}: {
	bossBattleId: number;
}): Promise<BossBattleEndRead> => {
	const response = await axiosInstance.post(
		getStartBossBattleSessionEndRoute(bossBattleId),
		{ withCredentials: true }
	);
	if (response.status !== 200) {
		throw new Error('Failed to start Battle Session: ' + bossBattleId);
	}

	return response.data;
};
