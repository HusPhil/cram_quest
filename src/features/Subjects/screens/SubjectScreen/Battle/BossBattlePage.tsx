import BossBattleArena from '../../../components/battle/BossBattleArena';
import BossBattleContorols from '../../../components/battle/BossBattleContorols';
import { useBattleSetupStore } from '../../../../Battle/stores/battleSetupStore';
import PixelButton from '../../../../../components/PixelButton';
import HealthBar from '../../../components/ui/HealthBar';
import { useState } from 'react';

export default function BossBattlePage() {
	const isBattleActive = useBattleSetupStore((state) => state.isBattleActive);
	const setIsBattleActive = useBattleSetupStore(
		(state) => state.setIsBattleActive
	);

	const enemyName = useBattleSetupStore((state) => state.enemyName);

	const playerMaxHealth = 100;
	const enemyMaxHealth = 100;

	const [playerHealth, setPlayerHealth] = useState(playerMaxHealth);
	const [enemyHealth, setEnemyHealth] = useState(enemyMaxHealth);

	const handleEnemyAttack = (damage: number, playerDefense: number) => {
		const effectiveDamage = damage - playerDefense;

		setPlayerHealth((prevHealth) => prevHealth - effectiveDamage);
	};

	const handlePlayerAttack = (damage: number) => {
		setEnemyHealth((prevHealth) => prevHealth - damage);
	};

	return (
		<div className="flex flex-col items-center ">
			{isBattleActive ? (
				<div className="w-full flex flex-col items-center">
					<div className="flex justify-between w-full 	">
						<HealthBar
							className=""
							health={playerHealth}
							maxHealth={playerMaxHealth}
							label="You"
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
					<BossBattleArena />
					<BossBattleContorols
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
