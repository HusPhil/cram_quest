import { BASE_URL } from '../api';

const baseBossBattleStatusRoute = 'boss_battle_status';

export const getBossBattleStatusEndRoute = (statusId: number) => {
	return `${BASE_URL}/${baseBossBattleStatusRoute}/${statusId}`;
};

export const getPlayerLatestBossBattleStatusEndRoute = (playerId: number) => {
	return `${BASE_URL}/${baseBossBattleStatusRoute}/player/${playerId}/latest`;
};

export const getPlayerBossBattleStatusesEndRoute = (playerId: number) => {
	return `${BASE_URL}/${baseBossBattleStatusRoute}/player/${playerId}`;
};
