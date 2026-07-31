const baseBossBattleStatusRoute = '/boss_battle_status';

export const getBossBattleStatusEndRoute = (statusId: number) => {
	return `${baseBossBattleStatusRoute}/${statusId}`;
};

export const getPlayerLatestBossBattleStatusEndRoute = (playerId: number) => {
	return `${baseBossBattleStatusRoute}/player/${playerId}/latest`;
};

export const getPlayerBossBattleStatusesEndRoute = (playerId: number) => {
	return `${baseBossBattleStatusRoute}/player/${playerId}`;
};

export const getEndBossBattleSessionEndRoute = (playerId: number) =>
	`${baseBossBattleStatusRoute}/player/${playerId}/end`;

export const getStartBossBattleSessionEndRoute = (bossBattleId: number) =>
	`${baseBossBattleStatusRoute}/player/${bossBattleId}/start`;
