import {
	ChangeEvent,
	createContext,
	useContext,
	useMemo,
	ReactNode,
	RefObject,
} from 'react';
import { BattleStepFn } from '../battleEngine/types';
import { Quest } from '../../Subjects/components/Pages/Quest/QuestsPage';
import { sceneName } from '../battleEngine/scenes/sceneNames';

export type BattleUIContextType = {
    customSceneActive: boolean;
	queueCustomScene: (
        sceneSteps: BattleStepFn[], 
        sceneName?: sceneName,
        onComplete?: (sceneName?: string) => void
    ) => void
    handleKillEnemySceneEnd: (
        sceneName: string | undefined
    ) => void
	onCheckboxChangeOnParent?: (
		e: ChangeEvent<HTMLInputElement>,
		quest: Quest
	) => void;
};

const BattleUIContext = createContext<BattleUIContextType | null>(null);

type BattleUIProviderProps = {
	customSceneActive: BattleUIContextType['customSceneActive'];
	queueCustomScene: BattleUIContextType['queueCustomScene'];
	handleKillEnemySceneEnd: BattleUIContextType['handleKillEnemySceneEnd'];
    onCheckboxChangeOnParent?: BattleUIContextType['onCheckboxChangeOnParent'];
	children: ReactNode;
};

export const BattleUIProvider = ({
	customSceneActive,
	queueCustomScene,
    handleKillEnemySceneEnd,
	onCheckboxChangeOnParent,
	children,
}: BattleUIProviderProps) => {
	const value = useMemo<BattleUIContextType>(
		() => ({
			customSceneActive,
			queueCustomScene,
            handleKillEnemySceneEnd,
			onCheckboxChangeOnParent,
		}),
		[customSceneActive, queueCustomScene, handleKillEnemySceneEnd, onCheckboxChangeOnParent]
	);

	return (
		<BattleUIContext.Provider value={value}>
			{children}
		</BattleUIContext.Provider>
	);
};


export const useBattleUI = (): BattleUIContextType => {
	const ctx = useContext(BattleUIContext);
	if (!ctx)
		throw new Error('useBattleUI must be used within a BattleUIProvider');
	return ctx;
};
