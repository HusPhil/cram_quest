import { BASE_URL } from '../../../data/api';

const basePlayerRoute = 'players';

export const getPlayerSubjectsEndRoute = (playerId: number) => {
	return `${BASE_URL}/${basePlayerRoute}/${playerId}/subjects`;
};

export const getPlayerProfileEndRoute = (playerId: number) => {
	return `${BASE_URL}/${basePlayerRoute}/${playerId}/profile`;
};
