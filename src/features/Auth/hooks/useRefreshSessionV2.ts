// src/hooks/useRefreshSession.ts
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify'; // or your toast library
import {
	refreshSession,
	updateStoresFromRefreshData,
} from '../../../lib/axios/token';

interface UseRefreshSessionOptions {
	staleTime?: number;
	retry?: number;
	refetchOnWindowFocus?: boolean;
	enabled?: boolean;
	showToasts?: boolean;
}

export function useRefreshSessionV2(options: UseRefreshSessionOptions = {}) {
	const {
		retry = 1,
		refetchOnWindowFocus = true,
		enabled = true,
		showToasts = true,
	} = options;

	const refreshSessionQuery = useQuery({
		queryKey: ['refreshSession'],
		queryFn: refreshSession,
		refetchOnWindowFocus,
		retry,
		enabled,
	});

	if (refreshSessionQuery.data) {
		updateStoresFromRefreshData(refreshSessionQuery.data);
		toast.success('Session refreshed', {
			toastId: 'refresh-session-success',
		});
	}

	return refreshSessionQuery;
}
