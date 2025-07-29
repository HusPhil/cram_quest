export interface BossBattleStatusBase {
	status: string;
	available_at?: Date | null;
	defeated_at?: Date | null;
}

export interface BossBattleStatusRead extends BossBattleStatusBase {
	id: number;
	player_id: number;
}
