import { useQuery } from '@tanstack/react-query';
import { getSubjectQuests } from '../../../../services/api/crud/subject_crud';

export const useGetSubjectQuests = (subject_id: number) => {
	const subjectQuestsQuery = useQuery({
		queryKey: ['subjects', subject_id, 'quests'],
		queryFn: () => getSubjectQuests({ subject_id }),
	});

	console.log('subjectQuestsQuery', subjectQuestsQuery);

	return subjectQuestsQuery;
};
