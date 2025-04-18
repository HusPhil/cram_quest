import { useQuery } from '@tanstack/react-query';
import { getUserPlayer } from '../../../services/api/crud/user_crud';
import { toast } from 'react-toastify';

export const useGetUserPlayer = (userId: number) => {
	const playerQuery = useQuery({
		queryKey: ['user', userId, 'player'],
		queryFn: () => getUserPlayer(userId),
	});

	if (playerQuery.isError)
		toast.error('Failed to load player', {
			toastId: 'user-player-error',
		});

	return playerQuery;
};
