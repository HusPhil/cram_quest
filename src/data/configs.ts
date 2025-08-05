type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export const rarityConfig: Record<
	Rarity,
	{
		glowClass: string;
		textColor: string;
		bgColor: string;
		borderColor: string;
		dropShadow: string;
	}
> = {
	common: {
		glowClass: 'shadow-gray-500/30',
		textColor: 'text-gray-300',
		bgColor: 'bg-gray-500/80',
		borderColor: 'border-gray-500/80',
		dropShadow: '',
	},
	rare: {
		glowClass: 'shadow-green-500/40',
		textColor: 'text-green-300',
		bgColor: 'bg-green-500/80',
		borderColor: 'border-green-500/80',
		dropShadow: 'drop-shadow-[0_0_10px_rgba(34,197,94,0.7)]',
	},
	epic: {
		glowClass: 'shadow-blue-500/40',
		textColor: 'text-blue-300',
		bgColor: 'bg-blue-500/80',
		borderColor: 'border-blue-500/80',
		dropShadow: 'drop-shadow-[0_0_10px_rgba(59,130,246,0.7)]',
	},
	legendary: {
		glowClass: 'shadow-purple-500/40',
		textColor: 'text-purple-300',
		bgColor: 'bg-purple-500/80',
		borderColor: 'border-purple-500/80',
		dropShadow: 'drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]',
	},
};
