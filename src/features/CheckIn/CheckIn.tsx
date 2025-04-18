import { useCallback, useEffect } from 'react';
import useCharacterAnimation from '../Battle/hooks/useCharacterAnimation';
import useScreenResize from '../../hooks/useScreenResize';
import PlayerCard from './components/PlayerCard/PlayerCard';
import WeeklyRecord from './components/WeeklyRecord.tsx/WeeklyRecord';
import RpgCard from '../../components/RpgCard';
import RankParticles from '../../components/RankParticle';
import { useGetUserPlayer } from './hooks/useGetUserPlayer';
import { useAuth } from '../../context/AuthContext';
import { useGetPlayerProfile } from './hooks/useGetPlayerProfile';
import {
	ParsedPlayerAvatar,
	parsePlayerAvatar,
} from '../../utils/parsePlayerAvatar';
import { useGetUser } from './hooks/useGetUser';

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
	const { currentScreenSize, currentHeightSize } = useScreenResize();

	const { currentUserId } = useAuth();
	const { data: player, isLoading: playerIsLoading } = useGetUserPlayer(
		currentUserId || -1
	);

	const { data: profile, isLoading: profileIsLoading } = useGetPlayerProfile(
		player?.id
	);

	const { data: user, isLoading: userIsLoading } = useGetUser(
		currentUserId || -1
	);

	const parsedAvatar: ParsedPlayerAvatar = profile?.avatar_url
		? parsePlayerAvatar(profile.avatar_url)
		: { playerClass: 'default', playerSkin: 'default_1' };

	return (
		<div className="flex flex-col items-center justify-end flex-1 mx-4">
			{/* Character Card */}
			{true ? (
				<RpgCard
					hoverable={false}
					className="w-full mb-2 py-5 max-w-sm md:max-w-xl lg:max-w-2xl lg:mb-5"
				>
					<PlayerCard
						playerClass={
							profileIsLoading
								? 'default'
								: parsedAvatar.playerClass
						}
						playerSkin={
							profileIsLoading
								? 'default_1'
								: parsedAvatar.playerSkin
						}
						currentScreenSize={currentScreenSize}
						currentExp={playerIsLoading ? 0 : player?.experience}
						nextLvlExp={39792}
						playerTitle={
							playerIsLoading ? 'Loading...' : player?.title
						}
						playerName={
							userIsLoading ? 'Loading...' : user?.username
						}
						isLoading={
							playerIsLoading || userIsLoading || profileIsLoading
						}
						currentLevel={playerIsLoading ? 0 : player?.level}
					/>
				</RpgCard>
			) : (
				<div>maliit screen height saka na ayusin</div>
			)}

			<div className="mx-3">
				<WeeklyRecord weeklyCheckInRecord={mockWeeklyCheckInRecord} />
			</div>
		</div>
	);
}
