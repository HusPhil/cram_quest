export type CharacterType = 'evil_shogun' | 'orc' | 'skeleton' | 'orc_lord' | 'pig_lord' | 'skeleton_lord' | 'pig' | 'dark_knight';
export type AnimationState = 'idle' | 'attack' | 'hurt' | 'walk';
export type AnimationConfig = {
  frameCount: number;
  fps: number;
  row: number;
};


export const baseAnimationConfig = {
    idle: { frameCount: 2, fps: 3, row: 1 },
    walk: { frameCount: 8, fps: 10, row: 0 },
    hurt: { frameCount: 8, fps: 10, row: 1 },
    attack: { frameCount: 7, fps: 10, row: 2 }
};

export const characterOverrides = {
    orc_lord: {},
    evil_shogun: {},
    skeleton_lord: {},
    dark_knight: {},
    pig_lord: {
      attack: { frameCount: 6, fps: 9, row: 2 }
    },

    skeleton: {    
      walk: { frameCount: 6, fps: 10, row: 0 },
      attack: { frameCount: 5, fps: 9, row: 2 }
    },
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
dark_knight: baseEnemySrcPath + 'dark_knight.png',

skeleton: baseEnemySrcPath + "skeleton.png",
orc: baseEnemySrcPath + 'orc.png',
pig: baseEnemySrcPath + 'pig.png'
};