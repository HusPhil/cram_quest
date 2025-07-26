import { useCallback, useState } from 'react';
import { useBattleEngineStore } from '../../../Battle/stores/battleEngineStore';
import { playerAttackScene } from '../../../Battle/battleEngine/scenes/playerAttack/playerAttackScene';
import { playerMissScene } from '../../../Battle/battleEngine/scenes/playerMiss/playerMissScene';

const ATTACK_SETTINGS = {
	speed: 150,
	hitTargetWidth: 30,
	cursorWidth: 10,
};

const DEFEND_SETTINGS = {
	speed: 80,
	hitTargetWidth: 30,
	cursorWidth: 10,
};

interface PhaseHelper {
	handlePlayerAttack: (damage: number) => void;
	handlePlayerAttackSceneEnd: (damage: number) => void;
	handleEnemyAttack: (damage: number, playerDefense: number) => void;
}

const PHASES = {
	attack: {
		base: 5,
		bonus: 15,
		successScene: playerAttackScene,
		failScene: playerMissScene,
		onSuccess: (damage: number, helper: PhaseHelper) =>
			helper.handlePlayerAttackSceneEnd(damage),
		onFail: (damage: number, helpers: any) =>
			helpers.handlePlayerAttack(damage),
		toast: {
			success: 'You dealt',
			fail: 'You missed, dealt',
		},
	},
} as const;

export const useBossBattleControls = () => {
	const [actionPhase, setActionPhase] = useState<string | null>(null);
	const [timingBarSettings, setTimingBarSettings] = useState(ATTACK_SETTINGS);

	const queueCustomScene = useBattleEngineStore(
		(state) => state.queueCustomScene
	);

	const handleAttackClick = useCallback(() => {
		setActionPhase('attack');
		setTimingBarSettings(ATTACK_SETTINGS);
	}, []);

	const handleDefendClick = useCallback(() => {
		setActionPhase('defend');
		setTimingBarSettings(DEFEND_SETTINGS);
	}, []);

	return {
		actionPhase,
		handleAttackClick,
		handleDefendClick,
	};
};
