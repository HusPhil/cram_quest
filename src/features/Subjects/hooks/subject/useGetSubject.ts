import { useQuery } from '@tanstack/react-query';
import { getSubject } from '../../../../services/api/crud/subject_crud';

export const useGetSubject = (subject_id: number) => {
	const subjectQuery = useQuery({
		queryKey: ['subjects', subject_id],
		queryFn: () => getSubject({ subject_id }),
	});
	return subjectQuery;
};
