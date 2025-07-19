import { StateCreator } from 'zustand';
import { PlayerTitle } from '../../../../services/api/schema/player_schema';

export interface PlayerSlice {
	playerId: number | null;
	title: PlayerTitle | null;
	level: number | null;
	experience: number | null;
	next_level_xp: number | null;
	session_streak: number | null;
	longest_session_streak: number | null;
	daily_streak: number | null;
	longest_daily_streak: number | null;

	setPlayer: (payload: Omit<PlayerSlice, 'setPlayer' | 'getPlayer'>) => void;
	getPlayer: () => Omit<PlayerSlice, 'setPlayer' | 'getPlayer'>;
}

export const createPlayerSlice: StateCreator<
	PlayerSlice,
	[],
	[],
	PlayerSlice
> = (set, get) => ({
	playerId: null,
	title: null,
	level: null,
	experience: null,
	next_level_xp: null,
	session_streak: null,
	longest_session_streak: null,
	daily_streak: null,
	longest_daily_streak: null,

	setPlayer: (payload) => set({ ...payload }),

	getPlayer: () => {
		const s = get();
		return {
			playerId: s.playerId,
			title: s.title,
			level: s.level,
			experience: s.experience,
			next_level_xp: s.next_level_xp,
			session_streak: s.session_streak,
			longest_session_streak: s.longest_session_streak,
			daily_streak: s.daily_streak,
			longest_daily_streak: s.longest_daily_streak,
		};
	},
});
