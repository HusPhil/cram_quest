import { BASE_URL } from '../../../data/api';

const baseQuesttRoute = 'quests';

export const getCreateQuestEndRoute = () => {
	return `${BASE_URL}/${baseQuesttRoute}/`;
};
