import React from 'react';
import { useBattleSetup } from '../../../Battle/hooks/useBattleSetup';
import BattleArena from './BattleArena';
import { GiSwordHilt } from 'react-icons/gi';
import { killEnemyScene } from '../../../Battle/battleEngine/scenes/killEnemy/killEnemyScene';
import { QuestRead } from '../../../../services/api/schema/quest_schema';

interface BattleScreenProps {
	currentQuest: QuestRead;
	battleDuration: number;
}

export default function BattleScreen({
	currentQuest,
	battleDuration,
}: BattleScreenProps) {
	const { battleEngineProps, arenaProps, battleUIProviderProps } =
		useBattleSetup();

	const long =
		' and then make lunch to make amends and make end meets when push comes to shove in deep learning!';

	const [currentTask, setCurrentTask] = React.useState(
		'Define database schemas' + long
	);

	const handleKillEnemyAnimationEnd = () => {
		battleUIProviderProps.handleQuestComplete('task');
	};

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
			<div className="flex flex-col items-center w-full my-3">
				<p className="text-xs">{'< Current Task >'}</p>
				<p className="line-clamp-2 text-white text-center ">
					{currentTask}
				</p>
			</div>
			<button
				onClick={handleKillEnemy}
				className="p-3 mt-3 bg-accent text-background flex justify-center items-center rounded-md"
			>
				Task Slayed!
			</button>
		</div>
	);
}
