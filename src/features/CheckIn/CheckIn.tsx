import useScreenResize from '../../hooks/useScreenResize';
import PlayerCard from './components/PlayerCard/PlayerCard';
import WeeklyRecord from './components/WeeklyRecord.tsx/WeeklyRecord';
import RpgCard from '../../components/RpgCard';
import { useGetUserPlayer } from './hooks/useGetUserPlayer';
import { useGetPlayerProfile } from './hooks/useGetPlayerProfile';
import {
	ParsedPlayerAvatar,
	parsePlayerAvatar,
} from '../../utils/parsePlayerAvatar';
import { useGetUser } from './hooks/useGetUser';
import { useEffect } from 'react';
import { useAuthInformationStore } from '../Auth/stores/authInformationStore';
import { useUserPlayerStore } from '../Auth/stores/userPlayerStore/userPlayerStore';
import { useShallow } from 'zustand/shallow';

const mockWeeklyCheckInRecord = [
	{
		day: 'Monday',
		date: '2025-04-01',
		checkIn: true,
	},
	{
		day: 'Tuesday',
		date: '2025-04-02',
		checkIn: true,
	},
	{
		day: 'Wednesday',
		date: '2025-04-03',
		checkIn: true,
	},
	{
		day: 'Thursday',
		date: '2025-04-04',
		checkIn: false,
	},
	{
		day: 'Friday',
		date: '2025-04-05',
		checkIn: true,
	},
	{
		day: 'Saturday',
		date: '2025-04-06',
		checkIn: false,
	},
	{
		day: 'Sunday',
		date: '2025-04-07',
		checkIn: true,
	},
];

export default function CheckIn() {
	const { currentScreenSize } = useScreenResize();

	const currentUser = useUserPlayerStore(
		useShallow((state) => ({
			userId: state.userId,
			username: state.username,
			email: state.email,
			is_active: state.is_active,
			is_admin: state.is_admin,
		}))
	);
	const currentPlayer = useUserPlayerStore(
		useShallow((state) => ({
			playerId: state.playerId,
			title: state.title,
			level: state.level,
			experience: state.experience,
			next_level_xp: state.next_level_xp,
			session_streak: state.session_streak,
			longest_session_streak: state.longest_session_streak,
			daily_streak: state.daily_streak,
			longest_daily_streak: state.longest_daily_streak,
		}))
	);
	const playerAvatarUrl = useUserPlayerStore((state) => state.avatarUrl);

	const parsedAvatar: ParsedPlayerAvatar = parsePlayerAvatar(
		playerAvatarUrl!
	);

	return (
		<div className="flex flex-col items-center justify-center flex-1 mx-4">
			<RpgCard
				hoverable={false}
				glowEffect={false}
				className="w-[80%] mb-2 py-5 max-w-sm md:w-full md:max-w-xl lg:max-w-2xl lg:mb-5"
			>
				<PlayerCard
					playerClass={parsedAvatar.playerClass}
					playerSkin={parsedAvatar.playerSkin}
					currentScreenSize={currentScreenSize}
					currentExp={!currentPlayer ? 0 : currentPlayer.experience!}
					nextLvlExp={currentPlayer?.next_level_xp!}
					playerTitle={
						!currentPlayer ? 'Loading...' : currentPlayer.title!
					}
					playerName={
						!currentUser ? 'Loading...' : currentUser.username!
					}
					isLoading={!currentUser || !currentPlayer}
					userError={
						!currentUser ? new Error('User not found') : null
					}
					playerError={
						!currentPlayer ? new Error('Player not found') : null
					}
					profileError={
						!playerAvatarUrl ? new Error('Profile not found') : null
					}
					currentLevel={!currentPlayer ? 0 : currentPlayer.level!}
				/>
			</RpgCard>

			<div className="mx-3">
				<WeeklyRecord weeklyCheckInRecord={mockWeeklyCheckInRecord} />
			</div>
		</div>
	);
}
