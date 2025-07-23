export type QuestStatus = 'todo' | 'doing' | 'done' | 'archive';

interface QuestBase {
	subject_id: number;
	description: string;
	difficulty: number;
	status: QuestStatus;
}
export interface QuestCreate extends QuestBase {}

export interface QuestRead extends QuestBase {
	id: number;
	created_at: string;
}

export interface QuestUpdate {
	description?: string;
	difficulty?: number;
	status?: QuestStatus;
}
