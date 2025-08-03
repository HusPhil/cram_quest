import { RewardItemRead } from './reward_schema';

export interface BossBattleStatusBase {
	status: string;
	available_at?: Date | null;
	defeated_at?: Date | null;
}

export interface BossBattleStatusRead extends BossBattleStatusBase {
	id: number;
	player_id: number;
}

export interface BossBattleEndRead {
	base_xp: number;
	bonus_xp: number;
	reward_item: RewardItemRead;
}

export interface BossBattleEndInfo {
	victory: boolean;
	total_rounds: number;
	player_health: number;
	enemy_health: number;
}
