import { BASE_URL } from '../api';

const baseQuesttRoute = 'quests';

export const getBaseQuestEndRoute = () => {
	return `${BASE_URL}/${baseQuesttRoute}/`;
};

export const getBaseQuestWithIdEndRoute = (questId: number) => {
	return `${BASE_URL}/${baseQuesttRoute}/${questId}/`;
};
