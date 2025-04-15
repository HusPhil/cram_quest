import { PlayerClass } from '../configs/spritesheetConfig';

interface ParsedPlayerAvatar {
    playerClass: PlayerClass;
    playerSkin: string;
}

export const parsePlayerAvatar = (avatarUrl: string): ParsedPlayerAvatar => {
    const [classPath, skinPath] = avatarUrl.split('/');
    return {
        playerClass: classPath as PlayerClass,
        playerSkin: skinPath.split('.')[0]
    };
};