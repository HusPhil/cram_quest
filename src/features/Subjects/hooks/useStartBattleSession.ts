import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../lib/axios/axiosInstance';
import { baseBattleSessionEndRoute } from '../../../services/api/routes/battle_session';
import { BattleSessionCreate } from '../../../services/api/schema/battle_session_schema';

export const useStartBattleSession = () => {
	return useMutation({
		mutationFn: startBattleSession,
	});
};

const startBattleSession = async ({
	startBattleSession,
}: {
	startBattleSession: BattleSessionCreate;
}) => {
	console.log('startBattleSession: ', startBattleSession);
	const response = await axiosInstance.post(
		baseBattleSessionEndRoute,
		startBattleSession,
		{ withCredentials: true }
	);

	if (response.status !== 200) {
		throw new Error('Failed to start a new Battle Session');
	}

	return response.data;
};
