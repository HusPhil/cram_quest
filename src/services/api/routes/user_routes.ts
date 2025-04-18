const baseUserRoute = '/users';

export const getUserPlayerEndRoute = (userId: number) => {
	return `${baseUserRoute}/${userId}/player`;
};
