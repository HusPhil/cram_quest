import { BASE_URL } from '../../../data/api';

const baseTaskRoute = 'tasks';

export const getStartTaskEndRoute = (taskId: number) => {
	return `${BASE_URL}/${baseTaskRoute}/${taskId}/start`;
};

export const getEndTaskEndRoute = (taskId: number) => {
	return `${BASE_URL}/${baseTaskRoute}/${taskId}/end`;
};
