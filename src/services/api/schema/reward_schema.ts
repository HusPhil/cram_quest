export type RewardRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface RewardItemRead {
	id: number;
	name: string;
	description: string;
	type: string;
	rarity: RewardRarity;
	stackable: boolean;
	equipped_image_url: string;
	image_url: string;
}
