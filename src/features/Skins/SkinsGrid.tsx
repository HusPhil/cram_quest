import React from 'react';

// Mock data for the skins
const SKINS = [
	{
		id: 16,
		name: 'knight_3',
		description: 'Skin: knight_3',
		type: 'skin',
		rarity: 'common',
		stackable: false,
		equipped_image_url: 'knight/knight_3.png',
		image_url: 'https://placehold.co/100x100/4a5568/a0aec0',
	},
	{
		id: 17,
		name: 'knight_4',
		description: 'Skin: knight_4',
		type: 'skin',
		rarity: 'common',
		stackable: false,
		equipped_image_url: 'knight/knight_4.png',
		image_url: 'https://placehold.co/100x100/4a5568/a0aec0',
	},
	{
		id: 12,
		name: 'default_2',
		description: 'Skin: default_2',
		type: 'skin',
		rarity: 'common',
		stackable: false,
		equipped_image_url: 'default/default_2.png',
		image_url: 'https://placehold.co/100x100/4a5568/a0aec0',
	},
	{
		id: 1,
		name: 'armored_knight_demonite',
		description: 'Skin: armored_knight_demonite',
		type: 'skin',
		rarity: 'epic',
		stackable: false,
		equipped_image_url: 'armored_knight/armored_knight_demonite.png',
		image_url: 'https://placehold.co/100x100/4a5568/a0aec0',
	},
	{
		id: 13,
		name: 'default_3',
		description: 'Skin: default_3',
		type: 'skin',
		rarity: 'common',
		stackable: false,
		equipped_image_url: 'default/default_3.png',
		image_url: 'https://placehold.co/100x100/4a5568/a0aec0',
	},
	{
		id: 15,
		name: 'knight_2',
		description: 'Skin: knight_2',
		type: 'skin',
		rarity: 'common',
		stackable: false,
		equipped_image_url: 'knight/knight_2.png',
		image_url: 'https://placehold.co/100x100/4a5568/a0aec0',
	},
	{
		id: 14,
		name: 'knight_1',
		description: 'Skin: knight_1',
		type: 'skin',
		rarity: 'common',
		stackable: false,
		equipped_image_url: 'knight/knight_1.png',
		image_url: 'https://placehold.co/100x100/4a5568/a0aec0',
	},
	{
		id: 9,
		name: 'police',
		description: 'Skin: police',
		type: 'skin',
		rarity: 'rare',
		stackable: false,
		equipped_image_url: 'worker/police.png',
		image_url: 'https://placehold.co/100x100/4a5568/a0aec0',
	},
	{
		id: 10,
		name: 'prince',
		description: 'Skin: prince',
		type: 'skin',
		rarity: 'rare',
		stackable: false,
		equipped_image_url: 'worker/prince.png',
		image_url: 'https://placehold.co/100x100/4a5568/a0aec0',
	},
	{
		id: 11,
		name: 'default_1',
		description: 'Skin: default_1',
		type: 'skin',
		rarity: 'common',
		stackable: false,
		equipped_image_url: 'default/default_1.png',
		image_url: 'https://placehold.co/100x100/4a5568/a0aec0',
	},
	{
		id: 4,
		name: 'armored_knight_iron',
		description: 'Skin: armored_knight_iron',
		type: 'skin',
		rarity: 'common',
		stackable: false,
		equipped_image_url: 'armored_knight/armored_knight_iron.png',
		image_url: 'https://placehold.co/100x100/4a5568/a0aec0',
	},
	{
		id: 5,
		name: 'armored_knight_platinum',
		description: 'Skin: armored_knight_platinum',
		type: 'skin',
		rarity: 'rare',
		stackable: false,
		equipped_image_url: 'armored_knight/armored_knight_platinum.png',
		image_url: 'https://placehold.co/100x100/4a5568/a0aec0',
	},
	{
		id: 6,
		name: 'armored_knight_titanium',
		description: 'Skin: armored_knight_titanium',
		type: 'skin',
		rarity: 'epic',
		stackable: false,
		equipped_image_url: 'armored_knight/armored_knight_titanium.png',
		image_url: 'https://placehold.co/100x100/4a5568/a0aec0',
	},
	{
		id: 8,
		name: 'engineer',
		description: 'Skin: engineer',
		type: 'skin',
		rarity: 'rare',
		stackable: false,
		equipped_image_url: 'worker/engineer.png',
		image_url: 'https://placehold.co/100x100/4a5568/a0aec0',
	},
	{
		id: 3,
		name: 'armored_knight_hallow',
		description: 'Skin: armored_knight_hallow',
		type: 'skin',
		rarity: 'legendary',
		stackable: false,
		equipped_image_url: 'armored_knight/armored_knight_hallow.png',
		image_url: 'https://placehold.co/100x100/4a5568/a0aec0',
	},
	{
		id: 7,
		name: 'armored_knight_wood',
		description: 'Skin: armored_knight_wood',
		type: 'skin',
		rarity: 'common',
		stackable: false,
		equipped_image_url: 'armored_knight/armored_knight_wood.png',
		image_url: 'https://placehold.co/100x100/4a5568/a0aec0',
	},
	{
		id: 2,
		name: 'armored_knight_gold',
		description: 'Skin: armored_knight_gold',
		type: 'skin',
		rarity: 'legendary',
		stackable: false,
		equipped_image_url: 'armored_knight/armored_knight_gold.png',
		image_url:
			'assets/images/items/skins/armored_knight/armored_knight_gold_display.png',
	},
];

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

interface Skin {
	id: number;
	name: string;
	description: string;
	type: string;
	rarity: Rarity;
	stackable: boolean;
	equipped_image_url: string;
	image_url: string;
}

const rarityConfig: Record<
	Rarity,
	{
		glowClass: string;
		textColor: string;
		bgColor: string;
		borderColor: string;
	}
> = {
	common: {
		glowClass: 'shadow-gray-500/30',
		textColor: 'text-gray-300',
		bgColor: 'bg-gray-500/80',
		borderColor: 'border-gray-500/80',
	},
	rare: {
		glowClass: 'shadow-green-500/40',
		textColor: 'text-green-300',
		bgColor: 'bg-green-500/80',
		borderColor: 'border-green-500/80',
	},
	epic: {
		glowClass: 'shadow-blue-500/40',
		textColor: 'text-blue-300',
		bgColor: 'bg-blue-500/80',
		borderColor: 'border-blue-500/80',
	},
	legendary: {
		glowClass: 'shadow-purple-500/40',
		textColor: 'text-purple-300',
		bgColor: 'bg-purple-500/80',
		borderColor: 'border-purple-500/80',
	},
};

interface SkinsGridItemProps {
	skin: Skin;
}

const SkinsGridItem = ({ skin }: SkinsGridItemProps) => {
	const config = rarityConfig[skin.rarity];

	const handleEquip = () => {
		console.log(`Equip button clicked for skin: ${skin.name}`);
	};

	return (
		<div
			className={`group relative flex flex-col p-2 bg-secondary/50 border rounded-lg cursor-pointer overflow-hidden
                       transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg
                       ${config.glowClass} ${config.borderColor}`}
		>
			<div
				className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-bold text-white ${config.bgColor}`}
			>
				{skin.rarity}
			</div>

			<div className="relative h-[100px] w-full lg:p-3">
				<img
					src={skin.image_url}
					alt={skin.name}
					className="w-full h-full scale-75  object-cover rounded-md [image-rendering:pixelated]"
				/>
			</div>

			<div className="flex flex-col flex-grow pb-3 px-3 space-y-2">
				<p
					className="font-bold font-rpg text-accent text-sm flex-grow text-center capitalize"
					style={{ minHeight: '2.5rem' }}
				>
					{skin.name.replace(/_/g, ' ')}
				</p>
				<button
					onClick={handleEquip}
					className={`w-full bg-accent text-secondary text-sm py-1 rounded font-rpg
                               hover:bg-accent/90 transition-colors duration-200`}
				>
					Equip
				</button>
			</div>
		</div>
	);
};

function SkinsGrid() {
	return (
		<div className="flex flex-1 flex-col">
			<h2 className="font-rpg text-2xl text-accent mb-6 text-center ">
				Available Skins
			</h2>
			<div className="relative flex-1">
				<div className="absolute inset-0 overflow-y-auto scroll-smooth flex justify-center no-scrollbar">
					<div className="h-full w-full max-w-[1200px] flex flex-col py-3 px-3.5 md:py-5 md:px-7">
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-7 flex-1">
							{SKINS.map((skin) => (
								<SkinsGridItem
									key={skin.id}
									skin={skin as Skin}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SkinsGrid;
