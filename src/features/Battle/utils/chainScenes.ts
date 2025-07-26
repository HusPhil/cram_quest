import { sceneName } from '../battleEngine/scenes/sceneNames';
import { BattleStepFn } from '../battleEngine/types';
import { QueueCustomSceneFn } from '../hooks/useBattleEngine';

export function chainScenes(
	queueCustomScene: QueueCustomSceneFn,
	scenes: {
		sceneSteps: BattleStepFn[];
		sceneName?: sceneName;
		onComplete?: () => void;
		onLastStepIndex?: () => void;
	}[],
	finalDone?: () => void
) {
	if (scenes.length === 0) {
		finalDone?.();
		return;
	}

	const [first, ...rest] = scenes;

	queueCustomScene({
		sceneSteps: first.sceneSteps,
		sceneName: first.sceneName,
		onComplete: () => {
			first.onComplete?.();
			setTimeout(
				() => chainScenes(queueCustomScene, rest, finalDone),
				50
			);
		},
		onLastStepIndex: first.onLastStepIndex,
	});
}
