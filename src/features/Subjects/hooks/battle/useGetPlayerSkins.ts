import { useQuery } from "@tanstack/react-query";
import { getPlayerSkins } from "../../../../services/api/crud/player_crud";
import { toast } from "../../../../lib/toastify/charLimitedToast";

export const useGetPlayerSkins = (playerId?: number) => {
  const playerSkinsQuery = useQuery({
    queryKey: ["player", playerId, "skins"],
    queryFn: () => getPlayerSkins(playerId!),
    refetchOnWindowFocus: false,
    enabled: !!playerId,
  });

  if (playerSkinsQuery.isError)
    toast.error("Player skins not found", {
      toastId: "load-player-skins-error",
    });

  return playerSkinsQuery;
};
