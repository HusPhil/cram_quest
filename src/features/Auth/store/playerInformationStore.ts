import { create } from 'zustand';

interface PlayerInformationState {
	// State
	player_id: number | null;

	setPlayerId: (playerId: number) => void;
}

export const usePlayerInformationStore = create<PlayerInformationState>(
	(set) => ({
		player_id: null,

		setPlayerId: (playerId: number) => set({ player_id: playerId }),
	})
);
