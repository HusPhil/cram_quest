import { memo } from 'react';
import SelectedQuestCard from '../../Quests/components/SelectedQuestCard';
import { useBattleUI } from '../context/BattleUIContext';

export const SelectedQuestList = () => {
	const { selectedQuests } = useBattleUI();

	return (
		<>
			{selectedQuests.map((quest) => (
				<SelectedQuestCard key={quest.id} quest={quest} />
			))}
		</>
	);
};

export default memo(SelectedQuestList);
