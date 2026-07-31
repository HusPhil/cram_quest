export const baseBattleSessionEndRoute = '/study_sessions';
export const getEndBattleSessionEndRoute = (battleSessionId: number) =>
	`${baseBattleSessionEndRoute}/${battleSessionId}/end`;

export const getResumeBattleSessionEndRoute = `${baseBattleSessionEndRoute}/active_session/resume`;
