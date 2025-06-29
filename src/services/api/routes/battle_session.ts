import { BASE_URL } from '../../../data/api';

export const baseBattleSessionEndRoute = `${BASE_URL}/study_sessions`;
export const getEndBattleSessionEndRoute = (battleSessionId: number) =>
	`${baseBattleSessionEndRoute}/${battleSessionId}/end`;
