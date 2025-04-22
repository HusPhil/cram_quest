import { useQuery } from '@tanstack/react-query';
import { getPlayerSubjects } from '../../../services/api/crud/player_crud';

export const useGetPlayerSubjects = (player_id: number | undefined) => {
	const subjectQuery = useQuery({
		queryKey: ['players', player_id, 'subjects'],
		queryFn: () => getPlayerSubjects(player_id!),
		enabled: player_id != null,
	});

	console.log('subjectQuery: ', subjectQuery);

	return subjectQuery;
};
