import { BattleStepFn } from '../../types';

export const playerAttackSceneEnd: BattleStepFn = ({
	next,
	end,
	setPlayerLoop,
	setPlayerAction,
}) => {
	setPlayerAction('idle');
	setPlayerLoop(true);
	next();
	return () => {
		end();
	};
};
