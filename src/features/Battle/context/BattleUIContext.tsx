import { 
	ChangeEvent, 
	createContext, 
	useContext, 
	useMemo, 
	ReactNode, 
  } from 'react'; 
  import { BattleStepFn } from '../battleEngine/types'; 
  import { Quest } from '../../Subjects/components/Pages/Quest/QuestsPage'; 
  import { sceneName } from '../battleEngine/scenes/sceneNames'; 
  
  // Define the context type
  export type BattleUIContextType = { 
	selectedQuests: Quest[];
	completedQuests: number;
	customSceneActive: boolean;
	queueCustomScene: (
	  sceneSteps: BattleStepFn[],  
	  sceneName?: sceneName, 
	  onComplete?: (sceneName?: sceneName) => void
	) => void;
	handleKillEnemySceneEnd: (
	  sceneName?: sceneName | undefined
	) => void;
	onCheckboxChangeOnParent?: (
	  e: ChangeEvent<HTMLInputElement>, 
	  quest: Quest
	) => void;
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
	const value = useMemo(() => ({
	  ...contextValues
	}), [
	  // Explicitly list all dependencies for proper memoization
	  ...Object.values(contextValues)
	]);
	
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