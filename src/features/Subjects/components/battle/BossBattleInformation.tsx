import { useEffect } from 'react';
import PixelButton from '../../../../components/PixelButton';
import { useUserPlayerStore } from '../../../Auth/stores/userPlayerStore/userPlayerStore';
import { useGetBossAvailabilityCounter } from '../../hooks/battle/useGetBossAvailabilityCounter';
import { useGetLatestBossBattleStatus } from '../../hooks/battle/useGetLatestBossBattleStatus';
import BossStatusLoader from './BossStatusLoader';

// Assuming a max availability for visual representation, let's say 3
const MAX_BOSS_AVAILABILITY = 3;

function BossBattleInformation({
	isBattleStartDisabled,
	isBattleStartLoading,
	setBossBattleId,
	handleStartBossBattle,
}: {
	isBattleStartDisabled: boolean;
	isBattleStartLoading: boolean;
	handleStartBossBattle: () => void;
	setBossBattleId: (id: number) => void;
}) {
	const currentPlayerId = useUserPlayerStore((state) => state.playerId);

	const playerLatestBossBattleStatus = useGetLatestBossBattleStatus(
		currentPlayerId!
	);

	const playerBossAvailabilityCounter = useGetBossAvailabilityCounter(
		currentPlayerId!
	);

	const isBossAvailable = () => {
		if (
			!playerLatestBossBattleStatus.data ||
			playerLatestBossBattleStatus.isError ||
			playerLatestBossBattleStatus.isLoading
		)
			return false;

		return playerLatestBossBattleStatus.data.status === 'available';
	};
	const currentCounter = isBossAvailable()
		? MAX_BOSS_AVAILABILITY
		: playerBossAvailabilityCounter.data ?? 0;

	// Create an array to map to our visual orbs/slots
	const orbSlots = Array.from(
		{ length: MAX_BOSS_AVAILABILITY },
		(_, i) => i + 1
	);

	useEffect(() => {
		if (playerLatestBossBattleStatus.data?.id) {
			setBossBattleId(playerLatestBossBattleStatus.data.id);
		}
	}, [playerLatestBossBattleStatus]);

	if (playerLatestBossBattleStatus.isLoading) {
		return <BossStatusLoader />;
	}

	if (playerLatestBossBattleStatus.isError) {
		return (
			<div className="w-full flex flex-col items-center gap-2">
				<p className="text-danger font-bold uppercase animate-pulse">
					Boss status unavailable
				</p>
				<p className="text-gray-400 text-sm">
					The boss is silent… try again shortly.
				</p>
			</div>
		);
	}

	return (
		<div>
			{/* Main Message */}

			{/* Boss Availability Section - Improved Display */}
			<div className="rounded-md mb-6 flex flex-col items-center ">
				<p className="text-gray-300 mb-3">Ritual Charges:</p>
				<div className="flex space-x-2 mb-4">
					{orbSlots.map((slotNum) => (
						<div
							key={slotNum}
							className={`w-10 h-10 border-2 ${
								currentCounter >= slotNum
									? 'border-amber-300 bg-amber-500 shadow-lg' // Filled orb
									: 'border-gray-500 bg-gray-600 opacity-50' // Empty slot
							} rounded-full flex items-center justify-center transition-all duration-300 ease-in-out`}
						>
							{/* Optional: Add a pixel art dot or symbol inside filled orbs */}
							{currentCounter >= slotNum && (
								<div className="w-4 h-4 bg-gray-900 rounded-full animate-pulse"></div>
							)}
						</div>
					))}
				</div>
				<p className="text-gray-400 text-sm mb-3">
					({currentCounter} of {MAX_BOSS_AVAILABILITY} charges
					accumulated)
				</p>

				<div className="flex items-center space-x-3 pt-4 border-t border-gray-600 w-full justify-center">
					<p className="text-gray-300">Boss Status:</p>
					<span
						className={` font-bold ${
							isBossAvailable()
								? 'text-green-400'
								: 'text-red-400'
						}`}
					>
						{isBossAvailable() ? 'AWAKE' : 'RESTING…'}
					</span>
				</div>
			</div>

			{/* Call to Action */}
			{isBossAvailable() && (
				<>
					<PixelButton
						disabled={!isBossAvailable() || isBattleStartDisabled}
						className=" py-2 "
						colors={{
							face: '#facc15', // Amber 400
							shadow: '#ca8a04', // Amber 600
							border: '#a16207', // Amber 700
							text: '#1f2937', // Dark Gray
						}}
						onClick={handleStartBossBattle}
					>
						<p className="uppercase">
							{isBattleStartLoading
								? 'Starting…'
								: 'Ready to Conquer'}
						</p>
					</PixelButton>
				</>
			)}
		</div>
	);
}

export default BossBattleInformation;
