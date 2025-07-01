import { BASE_URL } from '../api';

const baseTaskRoute = 'tasks';

export const getStartTaskEndRoute = (taskId: number) => {
	return `${BASE_URL}/${baseTaskRoute}/${taskId}/start`;
};

export const getEndTaskEndRoute = (taskId: number) => {
	return `${BASE_URL}/${baseTaskRoute}/${taskId}/end`;
};

export const syncTaskTimingsEndRoute = `${BASE_URL}/${baseTaskRoute}/sync_task_timings`;
