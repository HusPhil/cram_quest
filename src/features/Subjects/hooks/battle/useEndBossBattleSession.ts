import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../../lib/axios/axiosInstance';
import { BossBattleEndInfo, BossBattleEndRead } from '../../../../services/api/schema/boss_battle_status_schema';
import { getEndBossBattleSessionEndRoute } from '../../../../services/api/routes/boss_battle_status_routes';

export const useEndBossBattle = () => {
	return useMutation({
		mutationFn: endBattleSession,
	});
};

const endBattleSession = async ({
	playerId,
	bossBattleEndInfo,
}: {
	playerId: number;
	bossBattleEndInfo: BossBattleEndInfo
}): Promise<BossBattleEndRead> => {
	const response = await axiosInstance.post(
		getEndBossBattleSessionEndRoute(playerId),
		{player_id: playerId, battle_info: bossBattleEndInfo},
		{ withCredentials: true }
	);
	console.log(`Ending battle session with ID: ${playerId}`)
	if (response.status !== 200) {
		throw new Error('Failed to end Battle Session: ' + playerId);
	}

	return response.data;
};