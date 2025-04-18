import { PlayerClass } from '../features/Battle/configs/spritesheetConfig';

export interface ParsedPlayerAvatar {
	playerClass: PlayerClass;
	playerSkin: string;
}

export const parsePlayerAvatar = (avatarUrl: string): ParsedPlayerAvatar => {
	const [classPath, skinPath] = avatarUrl.split('/');
	return {
		playerClass: classPath as PlayerClass,
		playerSkin: skinPath.split('.')[0],
	};
};
