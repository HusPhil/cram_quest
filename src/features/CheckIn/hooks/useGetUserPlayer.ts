import { useQuery } from '@tanstack/react-query';
import { getUserPlayer } from '../../../services/api/crud/user_crud';
import { useAuthInformationStore } from '../../Auth/stores/authInformationStore';
import { toast } from '../../../lib/toastify/charLimitedToast';

export const useGetUserPlayer = (userId: number) => {
	const playerQuery = useQuery({
		queryKey: ['user', userId, 'player'],
		queryFn: () => getUserPlayer(userId),
	});

	if (playerQuery.isError) {
		toast.error('Player not found', {
			toastId: 'user-player-error',
		});
	}

	if (playerQuery.data) {
		const setCurrentPlayerId =
			useAuthInformationStore.getState().setPlayerId;
		setCurrentPlayerId(playerQuery.data.id!);
	}

	return playerQuery;
};
