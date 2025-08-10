import { useQuery } from '@tanstack/react-query';
import { getSubjectMaterials } from '../../../../services/api/crud/subject_crud';

export const useGetMaterials = (subject_id: number) => {
	const subjectQuery = useQuery({
		queryKey: ['players', subject_id, 'materials'],
		queryFn: () => getSubjectMaterials(subject_id!),
		enabled: subject_id != null,
	});

	console.log('subjectQuery: ', subjectQuery);

	return subjectQuery;
};
