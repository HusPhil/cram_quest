import { BASE_URL } from '../../../data/api';

const baseQuesttRoute = 'quests';

export const getBaseQuestEndRoute = () => {
	return `${BASE_URL}/${baseQuesttRoute}/`;
};

export const getBaseQuestWithIdEndRoute = (questId: number) => {
	return `${BASE_URL}/${baseQuesttRoute}/${questId}/`;
};
