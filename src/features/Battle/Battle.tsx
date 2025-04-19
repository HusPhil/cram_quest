import { memo, useEffect } from 'react';
import BattleArena from './components/BattleArena';
import SelectedQuestList from './components/SelectedQuestList';
import { killEnemyScene } from './battleEngine/scenes/killEnemy/killEnemyScene';
import { useBattleSetup } from './hooks/useBattleSetup';
import { BattleUIProvider } from './context/BattleUIContext';

export const Battle = () => {
	// document.documentElement.requestFullscreen();

	const { battleEngineProps, arenaProps, battleUIProviderProps } =
		useBattleSetup();

	useEffect(() => {
		const handleKeyUp = (e: KeyboardEvent) => {
			console.log(e.key);
			if (e.key === 'a') {
				battleEngineProps.queueCustomScene(
					killEnemyScene,
					'killEnemyScene',
					() => battleUIProviderProps.handleQuestComplete(3)
				);
			}
		};

		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, []);

	return (
		<BattleUIProvider
			selectedQuests={battleUIProviderProps.selectedQuests}
			completedQuestIds={battleUIProviderProps.completedQuestIds}
			queueCustomScene={battleEngineProps.queueCustomScene}
			handleQuestComplete={battleUIProviderProps.handleQuestComplete}
			customSceneActive={battleEngineProps.customSceneActiveRef.current}
		>
			<div className="w-full flex justify-center h-[75dvh]">
				<div className="flex flex-col h-full items-center  w-full">
					<div className="shrink-0">
						<BattleArena {...arenaProps} />
					</div>
					<p>
						{battleUIProviderProps.completedQuestIds.length}/
						{battleUIProviderProps.selectedQuests.length}
					</p>
					<div className="flex-1 overflow-auto bg-gray-800/0 p-5 space-y-2 mt-4 w-full no-scrollbar">
						<SelectedQuestList />
					</div>
				</div>
			</div>
		</BattleUIProvider>
	);
};

export default memo(Battle);
