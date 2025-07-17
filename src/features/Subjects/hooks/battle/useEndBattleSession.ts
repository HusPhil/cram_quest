import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../../lib/axios/axiosInstance';
import { getEndBattleSessionEndRoute } from '../../../../services/api/routes/battle_session';

export const useEndBattleSession = () => {
	return useMutation({
		mutationFn: endBattleSession,
	});
};

const endBattleSession = async ({
	battleSessionId,
}: {
	battleSessionId: number;
}) => {
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
