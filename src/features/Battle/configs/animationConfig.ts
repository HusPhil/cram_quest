export type CharacterType = 'evil_shogun' | 'orc' | 'skeleton' | 'orc_lord' | 'pig_lord' | 'skeleton_lord' | 'pig';
export type AnimationState = 'idle' | 'attack' | 'hurt' | 'walk' | 'death';
export type AnimationConfig = {
  frameCount: number;
  fps: number;
  row: number;
};


export const baseAnimationConfig = {
    idle: { frameCount: 2, fps: 3, row: 2 },
    walk: { frameCount: 8, fps: 10, row: 1 },
    attack: { frameCount: 8, fps: 12, row: 2 },
    hurt: { frameCount: 4, fps: 10, row: 3 },
    death: { frameCount: 10, fps: 8, row: 4 },
};

export const characterOverrides = {
    orc_lord: {},
    pig_lord: {},
    evil_shogun: {},
    skeleton_lord: {},
    skeleton: {},
    orc: {},
    pig: {},
};
  
const baseEnemySrcPath = "src/assets/images/enemies/"

// Asset paths
export const characterAssets = {
orc_lord: baseEnemySrcPath + 'orc_lord.png',
pig_lord: baseEnemySrcPath + 'pig_lord.png',
evil_shogun: baseEnemySrcPath + 'evil_shogun.png',
skeleton_lord: baseEnemySrcPath + 'skeleton_lord.png',

skeleton: baseEnemySrcPath + "skeleton.png",
orc: baseEnemySrcPath + 'orc.png',
pig: baseEnemySrcPath + 'pig.png'
};