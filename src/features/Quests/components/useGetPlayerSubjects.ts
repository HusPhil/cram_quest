import { useQuery } from '@tanstack/react-query';
import { getPlayerSubjects } from '../../../services/api/crud/player_crud';

export const useGetPlayerSubjects = (player_id: number | undefined) => {
	const questQuery = useQuery({
		queryKey: ['quests'],
		queryFn: () => getPlayerSubjects(player_id!),
		enabled: player_id != null,
	});

	console.log('questQuery', questQuery);

	return questQuery;
};
