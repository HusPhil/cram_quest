import { useEffect, useMemo } from "react";
import BattleArena from "../../../components/battle/BattleArena";
import { QuestRead } from "../../../../../services/api/schema/quest_schema";
import { useTaskBattleFlow } from "../../../hooks/battle/useTaskBattleFlow";
import BattleResultDisplay from "../../../components/battle/BattleResultDisplay";
import BattleCombatPanel from "../../../components/battle/BattleCombatPanel";
import BattleCalculatingLoader from "../../../components/battle/BattleCalculatingLoader";

interface BattlePageProps {
  battleCleanup: () => void;
  currentQuest: QuestRead;
  battleDuration: number;
}

export default function BattlePage({
  battleCleanup,
  currentQuest,
  battleDuration,
}: BattlePageProps) {
  const {
    generatedTasks,
    battleResult,
    completedTasks,
    currentTaskIndex,
    isCustomSceneActive,
    endBattleSessionMutate,
    getPlayerAnimation,
    handleKillEnemy,
    initializeBattleEngineControllers,
  } = useTaskBattleFlow();

  const battleArenaComponent = useMemo(
    () => (
      <BattleArena
        currentQuest={currentQuest}
        duration={battleDuration}
        initializeBattleEngineControllers={initializeBattleEngineControllers}
      />
    ),
    [battleDuration],
  );

  // Memoize derived values
  const completedTasksCount = completedTasks.length;
  const totalTasksCount = generatedTasks.length;
  const isAllTasksCompleted =
    totalTasksCount > 0 && completedTasksCount === totalTasksCount;
  const currentTask = generatedTasks[currentTaskIndex];

  const showResult = endBattleSessionMutate.isSuccess && battleResult;
  const showCalculating =
    endBattleSessionMutate.isPending || endBattleSessionMutate.isIdle;

  useEffect(() => {
    if (isAllTasksCompleted && !showResult && !showCalculating) {
      battleCleanup();
    }
  }, [isAllTasksCompleted, showResult, showCalculating, battleCleanup]);

  if (!isAllTasksCompleted) {
    return (
      <div className="flex items-center flex-col">
        <BattleCombatPanel
          currentQuest={currentQuest}
          currentTask={currentTask}
          battleArenaComponent={battleArenaComponent}
          completedTasksCount={completedTasksCount}
          totalTasksCount={totalTasksCount}
          isAllTasksCompleted={isAllTasksCompleted}
          isCustomSceneActive={isCustomSceneActive}
          handleKillEnemy={handleKillEnemy}
        />
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="flex items-center flex-col">
        <BattleResultDisplay
          sprite={getPlayerAnimation()}
          result={battleResult}
          battleCleanup={battleCleanup}
          battleSessionResult={endBattleSessionMutate.data}
        />
      </div>
    );
  }

  if (showCalculating) {
    return (
      <div className="flex items-center flex-col">
        <BattleCalculatingLoader sprite={getPlayerAnimation()} />
      </div>
    );
  }

  return null;
}
