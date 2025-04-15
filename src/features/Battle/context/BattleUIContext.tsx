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

export type BattleUIContextType = {
	queueCustomScene: (
        sceneSteps: BattleStepFn[], 
        sceneName?: string,
        onComplete?: (sceneName?: string) => void
    ) => void
	customSceneActive: boolean;
	onCheckboxChangeOnParent?: (
		e: ChangeEvent<HTMLInputElement>,
		quest: Quest
	) => void;
};

const BattleUIContext = createContext<BattleUIContextType | null>(null);

type BattleUIProviderProps = {
	queueCustomScene: BattleUIContextType['queueCustomScene'];
	customSceneActive: BattleUIContextType['customSceneActive'];
	onCheckboxChangeOnParent?: BattleUIContextType['onCheckboxChangeOnParent'];
	children: ReactNode;
};

export const BattleUIProvider = ({
	queueCustomScene,
	customSceneActive,
	onCheckboxChangeOnParent,
	children,
}: BattleUIProviderProps) => {
	const value = useMemo<BattleUIContextType>(
		() => ({
			queueCustomScene,
			customSceneActive,
			onCheckboxChangeOnParent,
		}),
		[queueCustomScene, customSceneActive, onCheckboxChangeOnParent]
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
