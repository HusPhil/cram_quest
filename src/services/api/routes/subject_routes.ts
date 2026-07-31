const baseSubjectRoute = '/subjects';

export const getBaseSubjectWithIdEndRoute = (subject_id: number) => {
	return `${baseSubjectRoute}/${subject_id}`;
};

export const getSubjectQuestsEndRoute = (subject_id: number) => {
	return `${baseSubjectRoute}/${subject_id}/quests`;
};

export const getCreateSubjectEndRoute = (playerId: number) => {
	return `${baseSubjectRoute}/?player_id=${playerId}`;
};

export const getMaterialEndRoute = (subject_id: number) => {
	return `${baseSubjectRoute}/${subject_id}/materials`;
};

export const getBaseMaterialEndRoute = (
	subject_id: number,
	materialId: number
) => {
	return `${baseSubjectRoute}/${subject_id}/materials/${materialId}`;
};
