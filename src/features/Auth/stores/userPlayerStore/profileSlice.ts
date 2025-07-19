import { StateCreator } from 'zustand';

export interface ProfileSlice {
	profileId: number | null;
	avatarUrl: string | null;
	bio: string | null;
	mood: string | null;

	setProfile: (
		payload: Omit<ProfileSlice, 'setProfile' | 'getProfile'>
	) => void;
	getProfile: () => Omit<ProfileSlice, 'setProfile' | 'getProfile'>;
}

export const createProfileSlice: StateCreator<
	ProfileSlice,
	[],
	[],
	ProfileSlice
> = (set, get) => ({
	profileId: null,
	avatarUrl: null,
	bio: null,
	mood: null,

	setProfile: (payload) => set({ ...payload }),

	getProfile: () => {
		const s = get();
		return {
			profileId: s.profileId,
			avatarUrl: s.avatarUrl,
			bio: s.bio,
			mood: s.mood,
		};
	},
});
