import { TaskRead } from './task_schema';

export type SessionStatus =
	| 'active'
	| 'pending'
	| 'completed'
	| 'defeat'
	| 'canceled';

export interface BattleSessionRead {
	id: number;
	player_id: number;
	quest_id: number;
	subject_id: number;
	start_time: string; // ISO date string
	end_time: string | null;
	actual_complete_time: string | null;
	bonus_xp: number;
	base_xp: number;
	status: SessionStatus;
	tasks: TaskRead[];
}

export interface BattleSessionEnd extends BattleSessionRead {
	session_streak: number;
	longest_session_streak: number;
	is_boss_available: boolean;
}

export interface BattleSessionCreate {
	player_id: number;
	quest_id: number;
	subject_id: number;
	duration_mins: number; // must be > 0
	tasks_to_create: string[]; // task descriptions
}

export interface BattleSessionResume {
	is_resumable: boolean;
	session_data: BattleSessionRead | null;
}
