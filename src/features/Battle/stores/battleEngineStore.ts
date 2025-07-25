import { create } from 'zustand';
import {
	AnimationParams,
	AnimationStateType,
} from '../hooks/useCharacterAnimation';
import React from 'react';
import { QueueCustomSceneFn } from '../hooks/useBattleEngine';

interface BattleEngineState {
	// player management
	setPlayerActionRef: React.RefObject<
		(action: AnimationStateType) => void
	> | null;
	playerPosX: number;
	playerZ: number;
	playerLoop: boolean;
	getPlayerAnimation: () => AnimationParams;

	// enemy management
	setEnemyActionRef: React.RefObject<
		(action: AnimationStateType) => void
	> | null;
	enemyPosX: number;
	enemyZ: number;
	enemyLoop: boolean;
	getEnemyAnimation: () => AnimationParams;

	isCustomSceneActive: boolean;
	getNewEnemy: () => void;
	queueCustomScene: QueueCustomSceneFn;

	resetBattleEngine: () => void;
}

interface BattleEngineActions {
	setPlayerPosX: (x: number) => void;
	setPlayerZ: (z: number) => void;
	setPlayerLoop: (loop: boolean) => void;

	setEnemyPosX: (x: number) => void;
	setEnemyZ: (z: number) => void;
	setEnemyLoop: (loop: boolean) => void;

	setIsCustomSceneActive: (active: boolean) => void;
}

export const useBattleEngineStore = create<
	BattleEngineState & BattleEngineActions
>((set) => ({
	// Initial state
	setPlayerActionRef: null,
	playerPosX: 0,
	playerZ: 0,
	playerLoop: true,
	getPlayerAnimation: () => ({} as AnimationParams),

	setEnemyActionRef: null,
	enemyPosX: 48 * 3,
	enemyZ: 0,
	enemyLoop: true,
	getEnemyAnimation: () => ({} as AnimationParams),

	isCustomSceneActive: false,
	getNewEnemy: () => {},
	queueCustomScene: () => {},

	// Actions
	setPlayerPosX: (x) => set({ playerPosX: x }),
	setPlayerZ: (z) => set({ playerZ: z }),
	setPlayerLoop: (loop) => set({ playerLoop: loop }),

	setEnemyPosX: (x) => set({ enemyPosX: x }),
	setEnemyZ: (z) => set({ enemyZ: z }),
	setEnemyLoop: (loop) => set({ enemyLoop: loop }),

	setIsCustomSceneActive: (active) => set({ isCustomSceneActive: active }),

	resetBattleEngine: () =>
		set(() => ({
			playerPosX: 0,
			enemyPosX: 48 * 3,
		})),
}));
