import { memo, useEffect, useRef, useState } from 'react';
import BattleArena from '../../Battle/components/BattleArena';
import SelectedQuestList from '../../Battle/components/SelectedQuestList';
import { killEnemyScene } from '../../Battle/battleEngine/scenes/killEnemy/killEnemyScene';
import { useBattleSetup } from '../../Battle/hooks/useBattleSetup';
import { BattleUIProvider, useBattleUI } from '../../Battle/context/BattleUIContext';
import PixelButton from '../../../components/PixelButton';

export const Battle = () => {
	
	const {
		battleProps,
		arenaProps,
		uiProviderProps,
	} = useBattleSetup();


	useEffect(() => {
		const handleKeyUp = (e: KeyboardEvent) => {
			console.log(e.key);
			if (e.key === 'a') {
				battleProps.queueCustomScene(killEnemyScene, "killEnemyScene", uiProviderProps.handleKillEnemySceneEnd);
			}
		};
		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, []);


	return (
		<BattleUIProvider
			completedQuests={uiProviderProps.completedQuests}
			selectedQuests={uiProviderProps.selectedQuests}
			customSceneActive={battleProps.customSceneActiveRef.current}
			queueCustomScene={battleProps.queueCustomScene}
			handleKillEnemySceneEnd={uiProviderProps.handleKillEnemySceneEnd}
			>
			<div className="w-full flex justify-center h-[75dvh]">
				<div className="flex flex-col h-full items-center  w-full">
					<div className="shrink-0">
						<BattleArena {...arenaProps} />
					</div>
					<p>{uiProviderProps.completedQuests}/{uiProviderProps.selectedQuests.length} </p>
					<div className="flex-1 overflow-auto bg-gray-800/0 p-5 space-y-2 mt-4 w-full no-scrollbar">
						<SelectedQuestList />
					</div>
				<PixelButton>
				eyy
			</PixelButton>
				</div>
			</div>
			
		</BattleUIProvider>
	);
};

export default memo(Battle);
