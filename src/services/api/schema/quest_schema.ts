interface QuestBase {
	subject_id: number;
	description: string;
	difficulty: number;
	status: string;
}
export interface QuestCreate extends QuestBase {}

export interface QuestRead extends QuestBase {
	id: number;
	player_id: number;
}

export interface QuestUpdate {
	description?: string;
	difficulty?: number;
	status?: string;
}
