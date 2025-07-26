import React from 'react';
import PixelButton from '../../../../components/PixelButton';
import { TimingBar } from '../ui/TimingBar';
import { useBossBattleControls } from '../../../Battle/hooks/useBossBattleControls';

// Define the props for BossBattleContorols
interface BossBattleControlsProps {
	incrementTurnCount: () => void;
	writeToBattleLog: (message: string) => void;
	handlePlayerAttack: (damage: number) => void;
	handleEnemyAttack: (damage: number, playerDefense: number) => void; // This will likely be called by game logic, not directly here.
}

const BossBattleContorls: React.FC<BossBattleControlsProps> = ({
	incrementTurnCount,
	writeToBattleLog,
	handlePlayerAttack,
	handleEnemyAttack, // Destructure the prop, but it won't be called directly by timing bar success/failure
}) => {
	const {
		actionPhase,
		currentSpeed,
		currentHitTargetWidth,
		currentCursorWidth,
		handleAttackClick,
		handleDefendClick,
		handleTimingBarStop,
	} = useBossBattleControls({
		handlePlayerAttack,
		handleEnemyAttack,
		writeToBattleLog,
		incrementTurnCount,
	});

	return (
		<div className="flex flex-col items-center w-full">
			{actionPhase === null ? (
				// Show ATTACK and DEFEND buttons initially
				<div className="flex gap-3 w-full   ">
					<PixelButton
						className="py-2 px-8"
						colors={{
							face: '#facc15',
							shadow: '#ca8a04',
							border: '#a16207',
							text: '#1f2937',
						}}
						onClick={handleAttackClick}
					>
						<p>ATTACK</p>
					</PixelButton>
					<PixelButton
						className="py-2 px-8"
						colors={{
							face: '#facc15',
							shadow: '#ca8a04',
							border: '#a16207',
							text: '#1f2937',
						}}
						onClick={handleDefendClick}
					>
						<p>DEFEND</p>
					</PixelButton>
				</div>
			) : (
				// Show timing bar when an action is selected
				<div className="mt-3 w-full max-w-lg">
					<TimingBar
						onStop={handleTimingBarStop}
						speed={currentSpeed}
						hitTargetWidth={currentHitTargetWidth}
						cursorWidth={currentCursorWidth}
					/>
				</div>
			)}
		</div>
	);
};

export default BossBattleContorls;
