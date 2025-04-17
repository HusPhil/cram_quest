const baseUserRoute = '/users';

export const getPlayerByUserEndRoute = (userId: number) => {
	return `${baseUserRoute}/${userId}/player`;
};
