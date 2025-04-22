import { BASE_URL } from '../../../data/api';

const baseSubjectRoute = 'subjects';

export const getBaseSubjectWithIdEndRoute = (subject_id: number) => {
	return `${BASE_URL}/${baseSubjectRoute}/${subject_id}`;
};

export const getSubjectQuestsEndRoute = (subject_id: number) => {
	return `${BASE_URL}/${baseSubjectRoute}/${subject_id}/quests`;
};

export const getCreateSubjectEndRoute = (playerId: number) => {
	return `${BASE_URL}/${baseSubjectRoute}/?player_id=${playerId}`;
};
