import { create } from 'zustand';

interface PlayerInformationState {
	// State
	userId: number | null;
	playerId: number | null;

	// Actions
	setUserId: (userId: number) => void;
	setPlayerId: (playerId: number) => void;
}

export const usePlayerInformationStore = create<PlayerInformationState>(
	(set) => ({
		userId: null,
		playerId: null,

		setUserId: (userId: number) => set({ userId: userId }),
		setPlayerId: (playerId: number) => set({ playerId: playerId }),
	})
);
