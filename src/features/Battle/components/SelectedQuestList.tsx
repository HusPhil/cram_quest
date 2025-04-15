import { ChangeEvent, memo } from 'react';
import SelectedQuestCard from '../../Quests/components/SelectedQuestCard';
import { Quest } from '../../Subjects/components/Pages/Quest/QuestsPage';
import { BattleStepFn } from '../battleEngine/types';
import { useBattleUI } from '../context/BattleUIContext';


export const SelectedQuestList = () => {
 
	const { selectedQuests } = useBattleUI()

	return (
		<>
			{selectedQuests.map((quest) => (
				<SelectedQuestCard
					key={quest.id}
					quest={quest}
				/>
			))}
		</>
	);
};

export default memo(SelectedQuestList);
