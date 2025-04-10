import { useQuery } from '@tanstack/react-query';
import { getSubject } from '../../../services/api/crud/subjects/getSubject';

export const useGetSubject = (subject_id: number) => {
	const subjectQuery = useQuery({
		queryKey: ['subjects', subject_id],
		queryFn: () => getSubject({ subject_id }),
	});

	console.log('subjectQuery', subjectQuery);

	return subjectQuery;
};
