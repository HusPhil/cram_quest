interface SubjectBase {
	code_name: string;
	description: string;
	difficulty: number;
}

export interface SubjectCreate extends SubjectBase {}

export interface SubjectRead extends SubjectBase {
	id: number;
	player_id: number;
}
