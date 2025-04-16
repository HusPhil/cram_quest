import { AnimationStateType } from '../hooks/useCharacterAnimation';
import { sceneName } from './scenes/sceneNames';

export type BattleStepFn = (ctx: BattleContext) => (() => void) | void;

export type BattleContext = {
	next: () => void;
	end: () => void;

	// Animation
	setPlayerAction: (action: AnimationStateType) => void;
	setEnemyAction: (action: AnimationStateType) => void;
	setPlayerLoop: (loop: boolean) => void;
	setEnemyLoop: (loop: boolean) => void;

	// Movement
	setPlayerPosX: React.Dispatch<React.SetStateAction<number>>;
	setEnemyPosX: React.Dispatch<React.SetStateAction<number>>;
	getPlayerPosX: () => number;
	getEnemyPosX: () => number;

	// Z-index
	adjustZValues: (entity: 'enemy' | 'player') => void;
};
