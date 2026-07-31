const baseUserRoute = '/users';

export const getUserEndRoute = (userId: number) => {
	return `${baseUserRoute}/${userId}/`;
};

export const getUserPlayerEndRoute = (userId: number) => {
	return `${baseUserRoute}/${userId}/player/`;
};
