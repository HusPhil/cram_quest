import React from 'react';
import { TbSword, TbTargetArrow } from 'react-icons/tb';
import colors from '../../../../data/colors';
import PixelButton from '../../../../components/PixelButton';

interface BattleCombatPanelProps {
	currentQuest: { description: string };
	currentTask: { description: string };
	battleArenaComponent: React.ReactNode;
	completedTasksCount: number;
	totalTasksCount: number;
	isAllTasksCompleted: boolean;
	isCustomSceneActive: boolean;
	handleKillEnemy: () => void;
}

export default function BattleCombatPanel({
	currentQuest,
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
			<div className="w-full border rounded-md mb-3 p-2 flex gap-2 px-5 items-center justify-between border-accent bg-accent/15">
				<TbTargetArrow
					className="w-6 h-6 shrink-0"
					color={colors.accent}
				/>
				<p className="line-clamp-2 text-center text-accent">
					{currentQuest.description}
				</p>
				<TbTargetArrow
					className="w-6 h-6 shrink-0"
					color={colors.accent}
				/>
			</div>

			<div className="shrink-0 mt-2">{battleArenaComponent}</div>

			<p className="mt-3 opacity-50 text-white">
				{completedTasksCount}/{totalTasksCount}
			</p>

			<div className="flex flex-col items-center w-full px-8 mb-2">
				<p className="line-clamp-2 text-white text-center overflow-ellipsis">
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
				Kill enemy!
			</PixelButton>
		</div>
	);
}
