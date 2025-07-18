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
}

export interface PlayerRead extends PlayerBase {
	id: number;
	userId: number;
}
