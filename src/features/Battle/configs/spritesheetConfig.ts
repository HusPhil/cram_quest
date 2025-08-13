export type EnemyType =
	| 'evil_shogun'
	| 'orc'
	| 'skeleton'
	| 'orc_lord'
	| 'pig_lord'
	| 'skeleton_lord'
	| 'pig'
	| 'dark_knight';

export type CharacterType = EnemyType | 'player';

export type BaseAnimationState = 'idle' | 'hurt' | 'walk' | 'death';
export type EnemyAnimationState = BaseAnimationState | 'attack';
export type PlayerAnimationState =
	| BaseAnimationState
	| 'attack_1'
	| 'attack_2'
	| 'attack_3'
	| 'celebrate';

export type AnimationConfig = {
	frameCount: number;
	fps: number;
	row: number;
	frameCountStart?: number;
};

// Type for a complete set of animation states
export type EnemyAnimations = Record<EnemyAnimationState, AnimationConfig>;
export type PlayerAnimations = Record<PlayerAnimationState, AnimationConfig>;

// Type for animation overrides (partial)
export type EnemyAnimationOverrides = Partial<
	Record<EnemyAnimationState, Partial<AnimationConfig>>
>;
export type PlayerAnimationOverrides = Partial<
	Record<PlayerAnimationState, Partial<AnimationConfig>>
>;

// Type for enemy animation overrides collection
export type EnemyAnimationOverridesMap = Record<
	EnemyType,
	EnemyAnimationOverrides
>;

// Player related types
export type PlayerClass = 'default' | 'knight' | 'armored_knight' | 'worker';
export type PlayerSkin =
	| 'armored_knight_demonite'
	| 'armored_knight_gold'
	| 'armored_knight_hallow'
	| 'armored_knight_iron'
	| 'armored_knight_platinum'
	| 'armored_knight_titanium'
	| 'armored_knight_wood'
	| 'engineer'
	| 'police'
	| 'prince'
	| 'default_1'
	| 'default_2'
	| 'default_3'
	| 'knight_1'
	| 'knight_2'
	| 'knight_3'
	| 'knight_4';

// Type for player class animation overrides
export type PlayerClassOverridesMap = Record<
	PlayerClass,
	PlayerAnimationOverrides
>;

// Type for player skin overrides within classes
export type PlayerSkinOverridesMap = Record<
	PlayerClass,
	Partial<Record<PlayerSkin, PlayerAnimationOverrides>>
>;

// Asset path types
export type EnemyAssetMap = Record<EnemyType, string>;
export type PlayerAssetMap = Record<
	PlayerClass,
	Partial<Record<PlayerSkin, string>>
>;

export const baseEnemyAnimationConfig: EnemyAnimations = {
	idle: { frameCount: 3, fps: 5, row: 0 },
	walk: { frameCount: 8, fps: 10, row: 1 },
	hurt: { frameCount: 3, fps: 10, row: 2 },
	attack: { frameCount: 4, fps: 10, row: 3 },
	death: { frameCount: 5, fps: 10, row: 2 },
};

export const enemyAnimationOverrides: EnemyAnimationOverridesMap = {
	orc_lord: {},
	evil_shogun: {},
	skeleton_lord: {},
	dark_knight: {},
	pig_lord: {},
	skeleton: {
		walk: { frameCount: 6, fps: 10, row: 1 },
		hurt: { frameCount: 3, fps: 10, row: 2 },
		attack: { frameCount: 4, fps: 8, row: 3 },
	},
	orc: {},
	pig: {},
};

// NEW: Base player configuration
export const basePlayerAnimationConfig: PlayerAnimations = {
	idle: { frameCount: 6, fps: 8, row: 0 },
	walk: { frameCount: 6, fps: 8, row: 1 },
	hurt: { frameCount: 4, fps: 7, row: 10 },
	death: { frameCount: 8, fps: 12, row: 11 },
	attack_1: { frameCount: 7, fps: 16, row: 5 },
	attack_2: { frameCount: 7, fps: 16, row: 6 },
	attack_3: { frameCount: 7, fps: 16, row: 7 },
	celebrate: { frameCount: 4, fps: 16, row: 3 },
};

// NEW: Player-specific overrides based on class
export const playerClassOverrides: PlayerClassOverridesMap = {
	default: {},
	knight: {},
	armored_knight: {},
	worker: {},
};

// NEW: Individual skin overrides within each class
export const playerSkinOverrides: PlayerSkinOverridesMap = {
	default: {
		default_1: {},
		default_2: {},
		default_3: {},
	},
	knight: {
		knight_1: {},
		knight_2: {},
	},
	armored_knight: {
		armored_knight_wood: {},
		armored_knight_iron: {},
		armored_knight_gold: {},
		armored_knight_platinum: {},
		armored_knight_demonite: {},
		armored_knight_titanium: {},
		armored_knight_hallow: {},
	},
	worker: {
		police: {},
		engineer: {},
		prince: {},
	},
};

const baseEnemySrcPath = '/assets/images/enemies/';

// Asset paths
export const enemyAssets = {
	orc_lord: baseEnemySrcPath + 'orc_lord.png',
	pig_lord: baseEnemySrcPath + 'pig_lord.png',
	evil_shogun: baseEnemySrcPath + 'evil_shogun.png',
	skeleton_lord: baseEnemySrcPath + 'skeleton_lord.png',
	dark_knight: baseEnemySrcPath + 'dark_knight.png',

	skeleton: baseEnemySrcPath + 'skeleton.png',
	orc: baseEnemySrcPath + 'orc.png',
	pig: baseEnemySrcPath + 'pig.png',
};

const basePlayerSrcPath = '/assets/images/player/skins/';
const defaultSkinPath = 'default/';
const knightSkinPath = 'knight/';
const armoredKnightSkinPath = 'armored_knight/';
const workerSkinPath = 'worker/';
// Asset paths
export const playerAssets: PlayerAssetMap = {
	default: {
		default_1: basePlayerSrcPath + defaultSkinPath + 'default_1.png',
		default_2: basePlayerSrcPath + defaultSkinPath + 'default_2.png',
		default_3: basePlayerSrcPath + defaultSkinPath + 'default_3.png',
	},
	knight: {
		knight_1: basePlayerSrcPath + knightSkinPath + 'knight_1.png',
		knight_2: basePlayerSrcPath + knightSkinPath + 'knight_2.png',
		knight_3: basePlayerSrcPath + knightSkinPath + 'knight_3.png',
		knight_4: basePlayerSrcPath + knightSkinPath + 'knight_4.png',
	},
	armored_knight: {
		armored_knight_wood:
			basePlayerSrcPath +
			armoredKnightSkinPath +
			'armored_knight_wood.png',
		armored_knight_iron:
			basePlayerSrcPath +
			armoredKnightSkinPath +
			'armored_knight_iron.png',
		armored_knight_gold:
			basePlayerSrcPath +
			armoredKnightSkinPath +
			'armored_knight_gold.png',
		armored_knight_platinum:
			basePlayerSrcPath +
			armoredKnightSkinPath +
			'armored_knight_platinum.png',
		armored_knight_demonite:
			basePlayerSrcPath +
			armoredKnightSkinPath +
			'armored_knight_demonite.png',
		armored_knight_titanium:
			basePlayerSrcPath +
			armoredKnightSkinPath +
			'armored_knight_titanium.png',
		armored_knight_hallow:
			basePlayerSrcPath +
			armoredKnightSkinPath +
			'armored_knight_hallow.png',
	},
	worker: {
		police: basePlayerSrcPath + workerSkinPath + 'police.png',
		engineer: basePlayerSrcPath + workerSkinPath + 'engineer.png',
		prince: basePlayerSrcPath + workerSkinPath + 'prince.png',
	},
};
