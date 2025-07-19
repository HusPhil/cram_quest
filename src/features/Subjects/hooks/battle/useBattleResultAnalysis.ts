import { BattleSessionEnd } from '../../../../services/api/schema/battle_session_schema';

const useBattleResultAnalysis = (battleSessionResult?: BattleSessionEnd) => {
	if (!battleSessionResult) return { duration: '00:00:00' };

	const startTime = new Date(battleSessionResult.start_time);
	const endTime = new Date(battleSessionResult.actual_complete_time!);

	const durationMs = endTime.getTime() - startTime.getTime();
	const totalSeconds = Math.floor(durationMs / 1000);

	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	// Format to HH:MM:SS
	const pad = (num: number) => String(num).padStart(2, '0');
	const duration = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

	return { duration };
};

export default useBattleResultAnalysis;
