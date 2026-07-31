import { useQuery } from "@tanstack/react-query";
import { getLatestBossBattleStatus } from "../../../../services/api/crud/boss_battle_status_crud";

export const useGetLatestBossBattleStatus = (playerId?: number) => {
  const latestBossBattleStatus = useQuery({
    queryKey: ["boss_battle_status", "player", playerId, "latest"],
    staleTime: 0,
    refetchOnMount: "always",
    queryFn: () => getLatestBossBattleStatus(playerId!),
    enabled: !!playerId,
  });

  return latestBossBattleStatus;
};
