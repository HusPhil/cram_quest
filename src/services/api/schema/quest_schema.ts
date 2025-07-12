interface QuestBase {
	id: number;
	subject_id: number;
	description: string;
	difficulty: number;
	status: string;
}
export interface QuestCreate extends QuestBase {}

export interface QuestRead extends QuestBase {
	player_id: number;
}

export interface QuestUpdate {
	description?: string;
	difficulty?: number;
	status?: string;
}
