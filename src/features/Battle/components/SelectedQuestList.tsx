import React, { memo, RefObject } from 'react';
import SelectedQuestCard from '../../Quests/components/SelectedQuestCard';
import { Quest } from '../../Subjects/components/Pages/Quest/QuestsPage';
import { BattleStepFn } from '../battleEngine/types';

const mockSelectedQuests: Quest[] = [
	{
		id: 1,
		description: 'Study React Hooks',
		difficulty: 2,
		deadline: '',
	},
	{
		id: 2,
		description: 'Complete TypeScript Tutorial',
		difficulty: 2,
		deadline: '',
	},
	{
		id: 3,
		description: 'Practice CSS Grid',
		difficulty: 2,
		deadline: '',
	},
	{
		id: 4,
		description: 'Learn Redux',
		difficulty: 3,
		deadline: '',
	},
	{
		id: 5,
		description: 'Build a Portfolio Website',
		difficulty: 4,
		deadline: '',
	},
];

interface SelectedQuestListProps {
	queueCustomSceneRef: RefObject<(battleScene: BattleStepFn[]) => void>;
	customSceneActiveRef: RefObject<boolean>;
}

export const SelectedQuestList = ({
	queueCustomSceneRef,
	customSceneActiveRef,
}: SelectedQuestListProps) => {
	return (
		<>
			{mockSelectedQuests.map((quest) => (
				<SelectedQuestCard
					key={quest.id}
					quest={quest}
					queueCustomSceneRef={queueCustomSceneRef}
					customSceneActiveRef={customSceneActiveRef}
				/>
			))}
		</>
	);
};

export default SelectedQuestList;
