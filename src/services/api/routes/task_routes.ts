const baseTaskRoute = '/tasks';

export const getStartTaskEndRoute = (taskId: number) => {
	return `${baseTaskRoute}/${taskId}/start`;
};

export const getEndTaskEndRoute = (taskId: number) => {
	return `${baseTaskRoute}/${taskId}/end`;
};

export const syncTaskTimingsEndRoute = `${baseTaskRoute}/sync_task_timings`;
