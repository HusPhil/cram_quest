import { create } from 'zustand';

interface AuthInformationState {
	// State
	accessToken: string | null;
	userId: number | null;
	playerId: number | null;

	// Actions
	setAcessToken: (token: string) => void;
	setUserId: (userId: number) => void;
	setPlayerId: (playerId: number) => void;
}

export const useAuthInformationStore = create<AuthInformationState>((set) => ({
	accessToken: null,
	userId: null,
	playerId: null,

	setAcessToken: (token: string) => set({ accessToken: token }),
	setUserId: (userId: number) => set({ userId: userId }),
	setPlayerId: (playerId: number) => set({ playerId: playerId }),
}));
