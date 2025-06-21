import React from 'react';
import { useBattleSetup } from '../../../Battle/hooks/useBattleSetup';
import BattleArena from './BattleArena';
import { GiSwordHilt } from 'react-icons/gi';

export default function BattleScreen({
	battleDuration,
}: {
	battleDuration: number;
}) {
	const { battleEngineProps, arenaProps, battleUIProviderProps } =
		useBattleSetup();

	const long =
		' and then make lunch to make amends and make end meets when push comes to shove in deep learning!';

	const [currentTask, setCurrentTask] = React.useState(
		'Define database schemas' + long
	);

	const [currentQuest, setCurrentQuest] = React.useState(
		'Setup the db of cramquest'
	);

	return (
		<div className="flex items-center flex-col">
			<div className="w-full border border-accent p-2 bg-accent/15 rounded-md mb-3 flex gap-2 px-5 items-center justify-center">
				<GiSwordHilt className="w-6 h-6 shrink-0" color="#fbbf24" />
				<p className=" line-clamp-2 text-accent">{currentQuest}</p>
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
			<button className="p-3 mt-3 bg-accent text-background flex justify-center items-center rounded-md">
				<GiSwordHilt />
				Slay this Task!
			</button>
		</div>
	);
}
