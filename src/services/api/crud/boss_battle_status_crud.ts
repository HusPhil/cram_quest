import { fetcher } from '../fetcher';
import { getPlayerLatestBossBattleStatusEndRoute } from '../routes/boss_battle_status_routes';
import { BossBattleStatusRead } from '../schema/boss_battle_status_schema';

export const getLatestBossBattleStatus = async (
	playerId: number
): Promise<BossBattleStatusRead> => {
	const response = await fetcher(
		getPlayerLatestBossBattleStatusEndRoute(playerId)
	);

	if (response.status !== 200) {
		throw new Error('Failed to fetch latest boss battle status');
	}

	console.log(
		'getPlayerLatestBossBattleStatusEndRoute response: ',
		response.data
	);

	return response.data;
};
