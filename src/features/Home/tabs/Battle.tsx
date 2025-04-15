import { memo, useEffect, useRef, useState } from 'react';
import BattleArena from '../../Battle/components/BattleArena';
import SelectedQuestList from '../../Battle/components/SelectedQuestList';
import useCharacterAnimation, {
	AnimationStateType,
} from '../../Battle/hooks/useCharacterAnimation';
import { useBattleEngine } from '../../Battle/battleEngine/useBattleEngine';
import { defaultBattleSequence } from '../../Battle/battleEngine/scenes/default/defaultSequence';
import { killEnemySequence } from '../../Battle/battleEngine/scenes/killEnemy/killEnemySequence';
import { parsePlayerAvatar } from '../../Battle/utils/parsePlayerAvatar';
import { BattleStepFn } from '../../Battle/battleEngine/types';

export const Battle = () => {
	const playerProfileAvatarUrl = 'default/default_1.png';
	const { playerClass, playerSkin } = parsePlayerAvatar(
		playerProfileAvatarUrl
	);

	const {
		getAnimationParams: getPlayerAnimation,
		setCurrentAction: setPlayerCurrentAction,
	} = useCharacterAnimation('player', playerClass, playerSkin);

	const {
		getAnimationParams: getEnemyAnimation,
		setCurrentAction: setEnemyCurrentAction,
	} = useCharacterAnimation('orc');

	const {
		startBattle,
		enemyPosX,
		enemyLoop,
		enemyZ,
		playerPosX,
		playerLoop,
		playerZ,
		setEnemyActionRef,
		setPlayerActionRef,
		queueCustomScene,
		customSceneActiveRef,
		setLoop,
	} = useBattleEngine(
		// killEnemySequence
		defaultBattleSequence
		// []
	);
	useEffect(() => {
		const handleKeyUp = (e: KeyboardEvent) => {
			console.log(e.key);
			if (e.key === 'a') {
				queueCustomScene(killEnemySequence);
			}
		};
		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, []);

	useEffect(() => {
		setPlayerActionRef.current = (action: AnimationStateType) =>
			setPlayerCurrentAction(action);
		setEnemyActionRef.current = (action: AnimationStateType) =>
			setEnemyCurrentAction(action);
		setLoop(true);		
		startBattle();
	}, []);


	return (
		<div className="w-full flex justify-center h-[75dvh]">
			<div className="flex flex-col h-full items-center  w-full">
				<div className="shrink-0">
					<BattleArena
						playerZ={playerZ}
						playerLoop={playerLoop}
						playerPosX={playerPosX}
						enemyZ={enemyZ}
						enemyLoop={enemyLoop}
						enemyPosX={enemyPosX}
						getPlayerAnimation={getPlayerAnimation}
						getEnemyAnimation={getEnemyAnimation}
						customSceneActiveRef={customSceneActiveRef}
					/>
				</div>
				<div className="flex-1 overflow-auto bg-gray-800/0 p-5 space-y-2 mt-4 w-full no-scrollbar">
					<SelectedQuestList
						queueCustomScene={queueCustomScene}
						customSceneActive={customSceneActiveRef.current}
					/>
				</div>
			</div>
		</div>
	);
};

export default memo(Battle);
