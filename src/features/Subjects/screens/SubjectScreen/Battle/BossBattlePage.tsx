import BossBattleArena from '../../../components/battle/BossBattleArena';
import BossBattleContorls from '../../../components/battle/BossBattleContorls';
import { useBattleSetupStore } from '../../../../Battle/stores/battleSetupStore';
import HealthBar from '../../../components/ui/HealthBar';
import { useEffect, useState } from 'react';
import { useUserPlayerStore } from '../../../../Auth/stores/userPlayerStore/userPlayerStore';
import FloatingMessage, {
	FloatingMessageData,
} from '../../../components/ui/FloatingMessage';
import BattleResultDisplay from '../../../components/battle/BattleResultDisplay';
import { useBattleEngineStore } from '../../../../Battle/stores/battleEngineStore';
import BossBattleInformation from '../../../components/battle/BossBattleInformation';
import { useEndBossBattle } from '../../../hooks/battle/useEndBossBattleSession';
import { useStartBossBattleSession } from '../../../hooks/battle/useStartBossBattleSession';
import { toast } from '../../../../../lib/toastify/charLimitedToast';

interface BossBattlePageProps {
	battleCleanup: () => void;
}

export default function BossBattlePage({ battleCleanup }: BossBattlePageProps) {
	const endBossBattleMutate = useEndBossBattle();
	const startBossBattleMutate = useStartBossBattleSession();

	const isBattleActive = useBattleSetupStore((state) => state.isBattleActive);
	const setIsBattleActive = useBattleSetupStore(
		(state) => state.setIsBattleActive
	);

	const enemyName = useBattleSetupStore((state) => state.enemyName);
	const currentPlayerUsername = useUserPlayerStore((state) => state.username);

	const [bossBattleId, setBossBattleId] = useState<number | null>(null);

	const playerMaxHealth = 100;
	const enemyMaxHealth = 100;

	const [playerHealth, setPlayerHealth] = useState(playerMaxHealth);
	const [enemyHealth, setEnemyHealth] = useState(enemyMaxHealth);

	const [turnCount, setTurnCount] = useState(1);

	const battleResult = useBattleSetupStore((state) => state.battleResult);
	const setBattleResult = useBattleSetupStore(
		(state) => state.setBattleResult
	);
	const getPlayerAnimation = useBattleEngineStore(
		(state) => state.getPlayerAnimation
	);

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

	const handleStartBossBattle = () => {
		startBossBattleMutate.mutate(
			{ bossBattleId: bossBattleId! },
			{
				onSuccess: () => {
					setIsBattleActive(true);
					setEnemyHealth(enemyMaxHealth);
					setPlayerHealth(playerMaxHealth);
					setFloatingMessageData({
						text: 'Battle Start!',
						variant: 'info',
						id: Date.now(),
					});
				},
			}
		);
	};

	const handleBossBattleCleanup = () => {
		battleCleanup();
		setTurnCount(0);
	};

	useEffect(() => {
		if (!isBattleActive || battleResult || !bossBattleId) return;
		if (playerHealth <= 0 || enemyHealth <= 0) {
			const isVictory = playerHealth > 0 && enemyHealth <= 0;
			endBossBattleMutate.mutate(
				{
					bossBattleEndInfo: {
						id: bossBattleId,
						victory: isVictory,
						total_rounds: turnCount,
						player_health: playerHealth,
						enemy_health: enemyHealth,
					},
					playerId: useUserPlayerStore.getState().playerId!,
				},
				{
					onSuccess: () => {
						if (isVictory) {
							toast.success('Congratulations!', {
								toastId: 'boss-battle-end-victory',
							});
						} else {
							toast.info('Better luck next time…', {
								toastId: 'boss-battle-end-defeat',
							});
						}
					},
				}
			);
		}
		if (playerHealth <= 0) {
			setBattleResult('defeat');
		} else if (enemyHealth <= 0) {
			setBattleResult('victory');
		}
	}, [enemyHealth, playerHealth]);

	return (
		<div className="flex flex-col items-center ">
			{battleResult ? (
				<>
					<BattleResultDisplay
						bossBattle
						battleSessionResult={endBossBattleMutate.data}
						result={battleResult}
						sprite={getPlayerAnimation()}
						battleCleanup={handleBossBattleCleanup}
					/>
				</>
			) : isBattleActive ? (
				<div className="w-full flex flex-col items-center">
					<div className="flex justify-between w-full ">
						<HealthBar
							health={playerHealth}
							maxHealth={playerMaxHealth}
							label={currentPlayerUsername ?? 'You'}
							iconSize={18}
						/>
						<div className="flex flex-col justify-center items-center flex-1 shrink-0">
							<p className="text-sm md:text-base">
								ROUND {turnCount}
							</p>
							<div className="relative w-full h-10  my-4  flex items-center justify-center overflow-hidden">
								<FloatingMessage
									messageData={floatingMessageData}
								/>
							</div>
						</div>
						<HealthBar
							className="flex flex-col items-end"
							health={enemyHealth}
							maxHealth={enemyMaxHealth}
							iconSize={18}
							label={enemyName ?? 'Enemy'}
						/>
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
				<BossBattleInformation
					setBossBattleId={(id: number) => setBossBattleId(id)}
					isBattleStartDisabled={
						endBossBattleMutate.isPending ||
						!bossBattleId ||
						startBossBattleMutate.isPending
					}
					handleStartBossBattle={handleStartBossBattle}
				/>
			)}
		</div>
	);
}
