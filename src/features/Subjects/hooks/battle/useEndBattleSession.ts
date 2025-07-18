import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../../lib/axios/axiosInstance';
import { getEndBattleSessionEndRoute } from '../../../../services/api/routes/battle_session';
import { BattleSessionRead } from '../../../../services/api/schema/battle_session_schema';

export const useEndBattleSession = () => {
	return useMutation({
		mutationFn: endBattleSession,
	});
};

const endBattleSession = async ({
	battleSessionId,
}: {
	battleSessionId: number;
}): Promise<BattleSessionRead> => {
	const response = await axiosInstance.post(
		getEndBattleSessionEndRoute(battleSessionId),
		{},
		{ withCredentials: true }
	);

	if (response.status !== 200) {
		throw new Error('Failed to end Battle Session: ' + battleSessionId);
	}

	return response.data;
};
