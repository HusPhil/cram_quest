import { memo, useEffect } from 'react';
import BattleArena from '../../Battle/components/BattleArena';
import SelectedQuestList from '../../Battle/components/SelectedQuestList';

export const Battle = () => {
	useEffect(() => {
		console.log('Battle re rendered');
	}, []);

	return (
		<div className="w-full flex justify-center h-[75dvh]">
			<div className="flex flex-col h-full items-center  w-full">
				<div className="shrink-0">
					<BattleArena />
				</div>

				<div className="flex-1 overflow-auto bg-gray-800/0 p-5 space-y-2 mt-4 w-full no-scrollbar">
					<SelectedQuestList />
				</div>
			</div>
		</div>
	);
};

export default memo(Battle);
