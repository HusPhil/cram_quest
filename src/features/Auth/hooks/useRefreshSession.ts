// src/hooks/useRefreshSession.ts
import { useQuery } from "@tanstack/react-query";
import {
  refreshSession,
  updateStoresFromRefreshData,
} from "../../../lib/axios/token";
import { toast } from "../../../lib/toastify/charLimitedToast";

interface UseRefreshSessionOptions {
  staleTime?: number;
  retry?: number;
  refetchOnWindowFocus?: boolean;
  enabled?: boolean;
  showToasts?: boolean;
}

export function useRefreshSession(options: UseRefreshSessionOptions = {}) {
  const { retry = 1, refetchOnWindowFocus = false, enabled = true } = options;

  const refreshSessionQuery = useQuery({
    queryKey: ["refreshSession"],
    queryFn: refreshSession,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus,
    retry,
    enabled,
  });

  if (refreshSessionQuery.data) {
    updateStoresFromRefreshData(refreshSessionQuery.data);
    toast.success("Session refreshed", {
      toastId: "refresh-session-success",
    });
  }

  return refreshSessionQuery;
}
