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
import { usePlayerInformationStore } from '../Auth/store/playerInformationStore';

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

	const currentUserId = usePlayerInformationStore.getState().userId;
	console.log('currentUserId', currentUserId);
	const {
		data: player,
		isLoading: playerIsLoading,
		error: playerError,
	} = useGetUserPlayer(currentUserId!);
	console.log('player', player?.id);

	const {
		data: profile,
		isLoading: profileIsLoading,
		error: profileError,
	} = useGetPlayerProfile(player?.id);

	const {
		data: user,
		isLoading: userIsLoading,
		error: userError,
	} = useGetUser(currentUserId!);

	useEffect(() => {
		if (!playerIsLoading && player?.id) {
			const setCurrentPlayerId =
				usePlayerInformationStore.getState().setPlayerId;
			setCurrentPlayerId(player.id);
		}
	}, [playerIsLoading]);

	const parsedAvatar: ParsedPlayerAvatar = profile?.avatar_url
		? parsePlayerAvatar(profile.avatar_url)
		: { playerClass: 'default', playerSkin: 'default_1' };

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
					currentExp={playerIsLoading ? 0 : player?.experience}
					nextLvlExp={39792}
					playerTitle={playerIsLoading ? 'Loading...' : player?.title}
					playerName={userIsLoading ? 'Loading...' : user?.username}
					isLoading={
						playerIsLoading || userIsLoading || profileIsLoading
					}
					userError={userError}
					playerError={playerError}
					profileError={profileError}
					currentLevel={playerIsLoading ? 0 : player?.level}
				/>
			</RpgCard>

			<div className="mx-3">
				<WeeklyRecord weeklyCheckInRecord={mockWeeklyCheckInRecord} />
			</div>
		</div>
	);
}
