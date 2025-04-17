import { useQuery } from '@tanstack/react-query';
import getPlayerSubjects from '../services/api/crud/players/getPlayerSubjects';

export const useFetchQuest = (player_id: number) => {
	const questQuery = useQuery({
		queryKey: ['quests'],
		queryFn: () => getPlayerSubjects(player_id),
	});

	console.log('questQuery', questQuery);

	return questQuery;
};
