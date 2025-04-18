const baseSubjectRoute = '/subjects';

export function getSubjectByIdRoute(subject_id: number) {
	return `${baseSubjectRoute}/${subject_id}`;
}
