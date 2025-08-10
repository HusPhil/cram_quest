import { StateCreator } from 'zustand';

export interface ProfileSlice {
	profileId: number | null;
	avatarUrl: string | null;
	skinUrl: string | null;
	bio: string | null;
	mood: string | null;

	setProfile: (
		payload: Omit<ProfileSlice, 'setProfile' | 'getProfile'>
	) => void;
	setSkinUrl: (skinUrl: string | null) => void;
	getProfile: () => Omit<
		ProfileSlice,
		'setProfile' | 'getProfile' | 'setSkinUrl'
	>;
}

export const createProfileSlice: StateCreator<
	ProfileSlice,
	[],
	[],
	ProfileSlice
> = (set, get) => ({
	profileId: null,
	avatarUrl: null,
	skinUrl: null,
	bio: null,
	mood: null,

	setProfile: (payload) => set({ ...payload }),

	setSkinUrl: (skinUrl) => set({ skinUrl }),

	getProfile: () => {
		const s = get();
		return {
			profileId: s.profileId,
			avatarUrl: s.avatarUrl,
			skinUrl: s.skinUrl,
			bio: s.bio,
			mood: s.mood,
		};
	},
});
