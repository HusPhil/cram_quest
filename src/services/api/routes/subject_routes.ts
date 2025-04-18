import { BASE_URL } from '../../../data/api';

const baseSubjectRoute = 'subjects';

export const getSubjectByIdEndRoute = (subject_id: number) => {
	return `${BASE_URL}/${baseSubjectRoute}/${subject_id}`;
};

export const getCreateSubjectEndRoute = (playerId: number) => {
	return `${BASE_URL}/${baseSubjectRoute}/?player_id=${playerId}`;
};
