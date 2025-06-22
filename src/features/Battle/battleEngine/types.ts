import { AnimationStateType } from '../hooks/useCharacterAnimation';

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
	setPlayerPosX: (x: number) => void;
	setEnemyPosX: (x: number) => void;
	getPlayerPosX: () => number;
	getEnemyPosX: () => number;

	// Z-index
	adjustZValues: (entity: 'enemy' | 'player') => void;
};
