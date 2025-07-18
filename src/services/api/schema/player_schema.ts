type PlayerTitle =
	| 'Novice'
	| 'Apprentice'
	| 'Adept'
	| 'Scholar'
	| 'Sage'
	| 'Archmage'
	| 'Omniscient';

interface PlayerBase {
	title: PlayerTitle;
	level: number;
	experience: number;
	next_level_xp: number;
	session_streak: number;
	longest_session_streak: number;
	daily_streak: number;
	longest_daily_streak: number;
}

export interface PlayerRead extends PlayerBase {
	id: number;
	userId: number;
}
