const baseQuesttRoute = '/quests';

export const getBaseQuestEndRoute = () => {
	return `${baseQuesttRoute}/`;
};

export const getBaseQuestWithIdEndRoute = (questId: number) => {
	return `${baseQuesttRoute}/${questId}`;
};
