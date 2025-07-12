import { create } from 'zustand';

interface UserPlayerState {
	// State
	userId: number | null;
	username: string | null;
	email: string | null;
	is_active: boolean | null;
	is_admin: boolean | null;

	playerId: number | null;

	profileId: number | null;
	avatarUrl: string | null;
	bio: string | null;
	mood: string | null;

	// Actions
	setPlayerId: (playerId: number) => void;
	setPlayerProfile: (
		profileId: number,
		avatarUrl: string,
		bio: string,
		mood: string
	) => void;
	setUserDetails: (
		userId: number,
		username: string,
		email: string,
		isAdmin: boolean,
		isActive: boolean
	) => void;
}

export const useUserPlayerStore = create<UserPlayerState>((set) => ({
	userId: null,
	username: null,
	email: null,
	is_active: null,
	is_admin: null,

	playerId: null,

	profileId: null,
	avatarUrl: null,
	bio: null,
	mood: null,

	setPlayerId: (playerId: number) => set({ playerId: playerId }),
	setPlayerProfile: (
		profileId: number,
		avatarUrl: string,
		bio: string,
		mood: string
	) =>
		set({
			profileId: profileId,
			avatarUrl: avatarUrl,
			bio: bio,
			mood: mood,
		}),
	setUserDetails: (
		userId: number,
		username: string,
		email: string,
		isAdmin: boolean,
		isActive: boolean
	) =>
		set({
			userId: userId,
			username: username,
			email: email,
			is_admin: isAdmin,
			is_active: isActive,
		}),
}));
