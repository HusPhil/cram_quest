import { StateCreator } from 'zustand';

export interface UserSlice {
	userId: number | null;
	username: string | null;
	email: string | null;
	is_active: boolean | null;
	is_admin: boolean | null;

	setUser: (payload: {
		userId: number;
		username: string;
		email: string;
		is_active: boolean;
		is_admin: boolean;
	}) => void;

	getUser: () => Omit<UserSlice, 'setUser' | 'getUser'>;
}

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
	set,
	get
) => ({
	userId: null,
	username: null,
	email: null,
	is_active: null,
	is_admin: null,

	setUser: (payload) =>
		set({
			userId: payload.userId,
			username: payload.username,
			email: payload.email,
			is_active: payload.is_active,
			is_admin: payload.is_admin,
		}),

	getUser: () => {
		const s = get();
		return {
			userId: s.userId,
			username: s.username,
			email: s.email,
			is_active: s.is_active,
			is_admin: s.is_admin,
		};
	},
});
