const basePlayerRoute = '/players';

export const getPlayerSubjectsEndRoute = (playerId: number) => {
	return `${basePlayerRoute}/${playerId}/subjects`;
};

export const getPlayerProfileEndRoute = (playerId: number) => {
	return `${basePlayerRoute}/${playerId}/profile`;
};

export const getPlayerBossAvailabilityCounterEndRoute = (playerId: number) => {
	return `${basePlayerRoute}/${playerId}/boss_availability_counter`;
};
