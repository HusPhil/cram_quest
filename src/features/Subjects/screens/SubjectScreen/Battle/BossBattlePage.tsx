import BossBattleArena from '../../../components/battle/BossBattleArena';
import BossBattleContorols from '../../../components/battle/BossBattleContorols';
import { useBattleSetupStore } from '../../../../Battle/stores/battleSetupStore';
import PixelButton from '../../../../../components/PixelButton';

export default function BossBattlePage() {
	const isBattleActive = useBattleSetupStore((state) => state.isBattleActive);
	const setIsBattleActive = useBattleSetupStore(
		(state) => state.setIsBattleActive
	);

	return (
		<div className="flex flex-col items-center ">
			{isBattleActive ? (
				<>
					<BossBattleArena />
					<BossBattleContorols />
				</>
			) : (
				<div className="flex flex-col items-center my-5">
					<p className="text-gray-300 text-center mb-6 text-xl font-semibold">
						Alright, champ! Got your game face on?
						<br />
						This boss ain't gonna fight itself!
					</p>
					<small className="text-xs text-gray-400 opacity-75">
						Just hit the{' '}
						<span className="text-amber-300 font-bold">
							I'm Ready!
						</span>{' '}
						button to start the brawl!
					</small>
					<div className="mt-3 flex justify-center">
						<PixelButton
							className="py-2 px-8 text-lg"
							colors={{
								face: '#facc15',
								shadow: '#ca8a04',
								border: '#a16207',
								text: '#1f2937',
							}}
							onClick={() => setIsBattleActive(true)}
						>
							<p>I'm Ready!</p>
						</PixelButton>
					</div>
				</div>
			)}
		</div>
	);
}
