import BossBattleArena from '../../../components/battle/BossBattleArena';
import BossBattleContorls from '../../../components/battle/BossBattleContorls';
import { useBattleSetupStore } from '../../../../Battle/stores/battleSetupStore';
import PixelButton from '../../../../../components/PixelButton';
import HealthBar from '../../../components/ui/HealthBar';
import { useEffect, useState } from 'react';
import { useUserPlayerStore } from '../../../../Auth/stores/userPlayerStore/userPlayerStore';
import FloatingMessage, {
	FloatingMessageData,
} from '../../../components/ui/FloatingMessage';
import { toast } from 'react-toastify';

export default function BossBattlePage() {
	const isBattleActive = useBattleSetupStore((state) => state.isBattleActive);
	const setIsBattleActive = useBattleSetupStore(
		(state) => state.setIsBattleActive
	);

	const enemyName = useBattleSetupStore((state) => state.enemyName);
	const currentPlayerUsername = useUserPlayerStore((state) => state.username);

	const playerMaxHealth = 100;
	const enemyMaxHealth = 100;

	const [playerHealth, setPlayerHealth] = useState(playerMaxHealth);
	const [enemyHealth, setEnemyHealth] = useState(enemyMaxHealth);

	const [turnCount, setTurnCount] = useState(0);

	const incrementTurnCount = () => setTurnCount((prevCount) => prevCount + 1);

	const [floatingMessageData, setFloatingMessageData] =
		useState<FloatingMessageData>();

	const handleEnemyAttack = (damage: number, playerDefense: number) => {
		const effectiveDamage = damage - playerDefense;

		setPlayerHealth((prevHealth) => prevHealth - effectiveDamage);
	};

	const handlePlayerAttack = (damage: number) => {
		setEnemyHealth((prevHealth) => prevHealth - damage);
	};

	const writeToBattleLog = (
		text: string, // Changed 'message' to 'text' to align with Message interface
		variant: 'success' | 'fail' | 'default' | 'info' = 'default' // Default variant
	) => {
		setFloatingMessageData({
			text: text, // Assign the passed 'text' to the 'text' property of Message
			variant: variant, // Assign the passed 'variant'
			id: Date.now(), // Generate a unique ID for React's key prop
		});
	};

	const handleEndBattle = (winner: 'player' | 'enemy') => {
		toast.success(`Battle won by ${winner === 'player' ? 'You' : 'Enemy'}`);
		setIsBattleActive(false);
	};

	useEffect(() => {
		if (!isBattleActive) return;
		if (playerHealth <= 0) {
			handleEndBattle('enemy');
		} else if (enemyHealth <= 0) {
			handleEndBattle('player');
		}
	}, [turnCount]);

	return (
		<div className="flex flex-col items-center ">
			{isBattleActive ? (
				<div className="w-full flex flex-col items-center">
					<div className="flex justify-between w-full 	">
						<HealthBar
							className=""
							health={playerHealth}
							maxHealth={playerMaxHealth}
							label={currentPlayerUsername ?? 'You'}
							iconSize={20}
						/>
						<HealthBar
							className=" flex flex-col items-end"
							health={enemyHealth}
							maxHealth={enemyMaxHealth}
							iconSize={20}
							label={enemyName ?? 'Enemy'}
						/>
					</div>
					<p>{turnCount}</p>
					{/* The "green box" area where the message should float */}
					<div className="relative w-full h-10  my-4 flex items-center justify-center overflow-hidden">
						<FloatingMessage messageData={floatingMessageData} />
					</div>
					<BossBattleArena />
					<BossBattleContorls
						incrementTurnCount={incrementTurnCount}
						writeToBattleLog={writeToBattleLog}
						handleEnemyAttack={handleEnemyAttack}
						handlePlayerAttack={handlePlayerAttack}
					/>
				</div>
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
