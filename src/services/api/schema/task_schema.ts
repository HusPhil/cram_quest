export interface TaskRead {
	id: number;
	description: string;
	start_time: string | null; // ISO date string
	end_time: string | null;
}
