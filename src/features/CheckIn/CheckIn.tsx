import useScreenResize from '../../hooks/useScreenResize';
import PlayerCard from './components/PlayerCard/PlayerCard';
import WeeklyRecord from './components/WeeklyRecord.tsx/WeeklyRecord';
import {
	ParsedPlayerAvatar,
	parsePlayerAvatar,
} from '../../utils/parsePlayerAvatar';
import { useUserPlayerStore } from '../Auth/stores/userPlayerStore/userPlayerStore';
import { useShallow } from 'zustand/shallow';
import { useGetLatestCheckIn } from './hooks/useGetLatestCheckIn';
import { useCheckIn } from './hooks/useCheckIn';
import { PlayerSkin } from '../Battle/configs/spritesheetConfig';
import { useGetPerfectWeeklyChechInReward } from './hooks/useGetPerfectWeeklyChechInReward';
import { useState } from 'react';
import PerfectWeeklyChecInRewardModal from './modal/PerfectWeeklyChecInRewardModal';
import { WeeklyCheckInRead } from '../../services/api/schema/weekly_check_in_schema';
import WeeklyRecordSkeleton from '../../components/Skeletons/WeeklyRecordSkeleton';
import PlayerCardSkeleton from '../../components/Skeletons/PlayerCardSkeleton';
import { toast } from '../../lib/toastify/charLimitedToast';

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
	const playerAvatarUrl = useUserPlayerStore(
		(state) => state.skinUrl || state.avatarUrl
	);

	const latestWeeklyCheckIn = useGetLatestCheckIn(
		currentPlayer.playerId || undefined
	);

	const checkInMutate = useCheckIn();
	const perfectWeeklyCheckInMutate = useGetPerfectWeeklyChechInReward();
	const [isRewardModalOpen, setIsRewardModalOpen] = useState(true);

	const parsedAvatar: ParsedPlayerAvatar = parsePlayerAvatar(
		playerAvatarUrl!
	);

	const checkForRewards = (latestWeeklyCheckIn: WeeklyCheckInRead) => {
		const daysInWeek = [
			'sunday',
			'monday',
			'tuesday',
			'wednesday',
			'thursday',
			'friday',
			'saturday',
		] as const;

		let isPerfectCheckIn = true;

		for (const day of daysInWeek) {
			if (!latestWeeklyCheckIn[day].is_checked) {
				isPerfectCheckIn = false;
				break;
			}
		}

		if (isPerfectCheckIn) {
			perfectWeeklyCheckInMutate.mutate(
				{ playerId: currentPlayer.playerId! },
				{
					onError: () => {
						toast.error('Failed to get reward', {
							toastId: 'perfect-weekly-check-in-reward-error',
						});
					},
					onSuccess: () => {
						setIsRewardModalOpen(true);
					},
				}
			);
		}
	};

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
				onSuccess: (data) => {
					toast.success('Checked in successfully', {
						toastId: 'check-in-success',
					});
					latestWeeklyCheckIn.refetch();

					checkForRewards(data);
				},
			}
		);
	};

	return (
		<div className="flex flex-col items-center justify-center flex-1 mx-4">
			<div className="bg-secondary/75 border-white/10 border px-5 rounded-md w-[80%] mb-2 py-5 max-w-sm md:w-full md:max-w-xl lg:max-w-2xl lg:mb-5">
				{!currentPlayer ? (
					<PlayerCardSkeleton />
				) : (
					<PlayerCard
						playerClass={parsedAvatar.playerClass}
						playerSkin={parsedAvatar.playerSkin as PlayerSkin}
						currentScreenSize={currentScreenSize}
						currentExp={
							!currentPlayer ? 0 : currentPlayer.experience!
						}
						nextLvlExp={
							!currentPlayer ? 0 : currentPlayer.next_level_xp!
						}
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
							!currentPlayer
								? new Error('Player not found')
								: null
						}
						profileError={
							!playerAvatarUrl
								? new Error('Profile not found')
								: null
						}
						currentLevel={!currentPlayer ? 0 : currentPlayer.level!}
					/>
				)}
			</div>

			{latestWeeklyCheckIn.isLoading ? (
				<WeeklyRecordSkeleton />
			) : (
				<div className="mx-3">
					<WeeklyRecord
						weeklyCheckInRecord={latestWeeklyCheckIn.data!}
						checkInLoading={checkInMutate.isPending}
						handleCheckIn={handleCheckIn}
					/>
				</div>
			)}

			{perfectWeeklyCheckInMutate.data && (
				<PerfectWeeklyChecInRewardModal
					isOpen={
						isRewardModalOpen &&
						perfectWeeklyCheckInMutate.data != null
					}
					weeklyReward={perfectWeeklyCheckInMutate.data}
					onClose={() => setIsRewardModalOpen(false)}
					title="Weekly Check In Reward"
				/>
			)}
		</div>
	);
}
