import { RewardItemRead } from './reward_schema';

export interface PlayerInventoryItemRead {
	id: number;
	player_id: number;
	reward_id: number;
	quantity: number;
	equipped_slot: string | null;
	item: RewardItemRead;
}

export type ItemUses = 'equipped' | 'unedquipped' | 'used';

export interface UseItemResponse {
	status: ItemUses;
}
