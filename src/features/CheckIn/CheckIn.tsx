import useScreenResize from '../../hooks/useScreenResize';
import PlayerCard from './components/PlayerCard/PlayerCard';
import WeeklyRecord from './components/WeeklyRecord.tsx/WeeklyRecord';
import RpgCard from '../../components/RpgCard';
import {
	ParsedPlayerAvatar,
	parsePlayerAvatar,
} from '../../utils/parsePlayerAvatar';
import { useUserPlayerStore } from '../Auth/stores/userPlayerStore/userPlayerStore';
import { useShallow } from 'zustand/shallow';
import { useRefreshSession } from '../Auth/hooks/useRefreshSession';
import { useGetLatestCheckIn } from './hooks/useGetLatestCheckIn';
import { useCheckIn } from './hooks/useCheckIn';
import { toast } from 'react-toastify';

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

	const refreshSession = useRefreshSession({
		refetchOnWindowFocus: true,
	});

	const latestWeeklyCheckIn = useGetLatestCheckIn(
		currentPlayer.playerId || undefined
	);

	const checkInMutate = useCheckIn();

	const parsedAvatar: ParsedPlayerAvatar = parsePlayerAvatar(
		playerAvatarUrl!
	);

	const handleCheckIn = () => {
		if (!currentPlayer.playerId) return;
		checkInMutate.mutate(
			{
				playerId: currentPlayer.playerId,
			},
			{
				onError: () => {
					toast.error('Failed to check in', {
						toastId: 'check-in-error',
					});
				},
				onSuccess: () => {
					toast.success('Checked in successfully', {
						toastId: 'check-in-success',
					});
					latestWeeklyCheckIn.refetch();
					refreshSession.refetch();
				},
			}
		);
	};

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
					nextLvlExp={
						!currentPlayer ? 0 : currentPlayer.next_level_xp!
					}
					playerTitle={
						!currentPlayer ? 'Loading...' : currentPlayer.title!
					}
					playerName={
						!currentUser ? 'Loading...' : currentUser.username!
					}
					isLoading={
						!currentUser ||
						!currentPlayer ||
						refreshSession.isLoading
					}
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

			{!latestWeeklyCheckIn.isLoading ? (
				<div className="mx-3">
					<WeeklyRecord
						weeklyCheckInRecord={latestWeeklyCheckIn.data!}
						handleCheckIn={handleCheckIn}
					/>
				</div>
			) : null}
		</div>
	);
}
