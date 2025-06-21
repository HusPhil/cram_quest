import { createContext, useContext, useMemo, ReactNode } from 'react';
import { QueueCustomSceneFn } from '../hooks/useBattleEngine';
import { QuestRead } from '../../../services/api/schema/quest_schema';

// Define the context type
export type BattleUIContextType = {
	selectedQuests: QuestRead[];
	completedQuestIds: number[];
	customSceneActive: boolean;
	handleQuestComplete: (questId: number) => void;
	queueCustomScene: QueueCustomSceneFn;
};

const BattleUIContext = createContext<BattleUIContextType | null>(null);

type BattleUIProviderProps = BattleUIContextType & {
	children: ReactNode;
};

export const BattleUIProvider = ({
	children,
	...contextValues
}: BattleUIProviderProps) => {
	// Restore useMemo to prevent unnecessary re-renders
	const value = useMemo(
		() => ({
			...contextValues,
		}),
		[
			// Explicitly list all dependencies for proper memoization
			...Object.values(contextValues),
		]
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
