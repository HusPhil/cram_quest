import { BASE_URL } from '../api';

const baseUserRoute = 'users';

export const getUserEndRoute = (userId: number) => {
	return `${BASE_URL}/${baseUserRoute}/${userId}/`;
};

export const getUserPlayerEndRoute = (userId: number) => {
	return `${BASE_URL}/${baseUserRoute}/${userId}/player/`;
};
