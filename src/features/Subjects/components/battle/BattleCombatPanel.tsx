import React from 'react';
import PixelButton from '../../../../components/PixelButton';

interface BattleCombatPanelProps {
	currentTask: { description: string };
	battleArenaComponent: React.ReactNode;
	completedTasksCount: number;
	totalTasksCount: number;
	isAllTasksCompleted: boolean;
	isCustomSceneActive: boolean;
	handleKillEnemy: () => void;
}

export default function BattleCombatPanel({
	currentTask,
	battleArenaComponent,
	completedTasksCount,
	totalTasksCount,
	isAllTasksCompleted,
	isCustomSceneActive,
	handleKillEnemy,
}: BattleCombatPanelProps) {
	return (
		<div className="w-full flex flex-col items-center ">
			<div className="shrink-0 mt-2">{battleArenaComponent}</div>

			<p className="mt-3 opacity-50 text-white">
				{completedTasksCount}/{totalTasksCount}
			</p>

			<div className="flex flex-col items-center w-full px-8 mb-2">
				<p
					title={currentTask.description}
					className="line-clamp-2 text-white text-center overflow-ellipsis"
				>
					{currentTask.description}
				</p>
			</div>

			<PixelButton
				className="py-1 px-7"
				disabled={isAllTasksCompleted || isCustomSceneActive}
				onClick={handleKillEnemy}
				colors={{
					face: '#facc15',
					shadow: '#ca8a04',
					border: '#a16207',
					text: '#1f2937',
				}}
			>
				{/* <TbSword className="w-5 h-5 mr-2" color={colors.secondary} /> */}
				ATTACK
			</PixelButton>
		</div>
	);
}
