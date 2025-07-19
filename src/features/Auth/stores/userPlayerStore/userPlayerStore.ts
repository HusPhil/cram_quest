import { create } from 'zustand';
import { UserSlice, createUserSlice } from './userSlice';
import { PlayerSlice, createPlayerSlice } from './playerSlice';
import { ProfileSlice, createProfileSlice } from './profileSlice';

export type UserPlayerStore = UserSlice & PlayerSlice & ProfileSlice;

export const useUserPlayerStore = create<UserPlayerStore>()(
	(set, get, store) => ({
		...createUserSlice(set, get, store),
		...createPlayerSlice(set, get, store),
		...createProfileSlice(set, get, store),
	})
);
