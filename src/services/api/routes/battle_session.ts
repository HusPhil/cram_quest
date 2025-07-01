import { BASE_URL } from '../api';

export const baseBattleSessionEndRoute = `${BASE_URL}/study_sessions`;
export const getEndBattleSessionEndRoute = (battleSessionId: number) =>
	`${baseBattleSessionEndRoute}/${battleSessionId}/end`;
