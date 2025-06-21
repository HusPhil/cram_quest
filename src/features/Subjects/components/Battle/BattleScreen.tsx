import React, { useEffect } from 'react';
import { useBattleSetup } from '../../../Battle/hooks/useBattleSetup';
import BattleArena from './BattleArena';
import { GiSwordHilt } from 'react-icons/gi';
import { killEnemyScene } from '../../../Battle/battleEngine/scenes/killEnemy/killEnemyScene';
import { QuestRead } from '../../../../services/api/schema/quest_schema';
import { useSetupBattleStore } from '../../stores/setupBattleStore';
import { toast } from 'react-toastify';

interface BattleScreenProps {
	battleCleanup: () => void;
	currentQuest: QuestRead;
	battleDuration: number;
}

export default function BattleScreen({
	battleCleanup,
	currentQuest,
	battleDuration,
}: BattleScreenProps) {
	const { battleEngineProps, arenaProps, battleUIProviderProps } =
		useBattleSetup();

	const getSelectedTasks = useSetupBattleStore(
		(state) => state.getCleanedQuestSteps
	);

	const long =
		' and then make lunch to make amends and make end meets when push comes to shove in deep learning!';

	const [completedTasks, setCompletedTasks] = React.useState<string[]>([]);

	const [currentTaskIndex, setCurrentTaskIndex] = React.useState(0);

	const handleCompleteTask = (completedTask: string) => {
		setCompletedTasks([...completedTasks, completedTask]);
		setCurrentTaskIndex((prev) => {
			return prev < getSelectedTasks().length ? prev + 1 : prev;
		});
	};

	const handleKillEnemyAnimationEnd = () => {
		const completedTask = getSelectedTasks()[currentTaskIndex];
		battleUIProviderProps.handleQuestComplete(completedTask);
		handleCompleteTask(completedTask);
	};

	const handleQuestComplete = () => {
		toast.success('Quest completed!', {
			toastId: 'quest-completed',
		});
		setTimeout(() => {
			battleCleanup();
		}, 1000 * 3);
	};

	useEffect(() => {
		if (currentTaskIndex >= getSelectedTasks().length) {
			handleQuestComplete();
		}
	}, [currentTaskIndex]);

	const handleKillEnemy = () => {
		battleEngineProps.queueCustomScene(
			killEnemyScene,
			'killEnemyScene',
			handleKillEnemyAnimationEnd
		);
	};

	return (
		<div className="flex items-center flex-col">
			<div className="w-full border border-accent p-2 bg-accent/15 rounded-md mb-3 flex gap-2 px-5 items-center justify-center">
				<GiSwordHilt className="w-6 h-6 shrink-0" color="#fbbf24" />
				<p className=" line-clamp-2 text-accent">
					{currentQuest.description}
				</p>
			</div>
			<div className="shrink-0 mt-2">
				<BattleArena {...arenaProps} duration={battleDuration} />
			</div>
			<p>
				{completedTasks.length}/{getSelectedTasks().length}
			</p>
			{completedTasks.length === getSelectedTasks().length ? (
				<>COMPLETED!</>
			) : (
				<div className="flex flex-col items-center w-full my-3">
					<p className="text-xs">{'< Current Task >'}</p>
					<p className="line-clamp-2 text-white text-center ">
						{getSelectedTasks()[currentTaskIndex]}
					</p>
				</div>
			)}
			<button
				disabled={completedTasks.length === getSelectedTasks().length}
				onClick={handleKillEnemy}
				className="p-3 mt-3 bg-accent text-background flex justify-center items-center rounded-md"
			>
				Task Slayed!
			</button>
		</div>
	);
}
