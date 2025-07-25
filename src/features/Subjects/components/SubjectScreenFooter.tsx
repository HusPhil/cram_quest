import { useSubjectStore_UI } from '../stores/subjectStore_UI';

interface SubjectScreenFooterProps {
	subjectId: number;
}

export default function SubjectScreenFooter({}: SubjectScreenFooterProps) {
	const setActiveModal = useSubjectStore_UI((state) => state.setActiveModal);
	const subjectQuests = useSubjectStore_UI((state) => state.subjectQuests);
	const availableBossFight = true;

	const bosstBattleBtnStyles = availableBossFight
		? ' bg-success text-background animate-pulse '
		: ' bg-accent text-background';

	return (
		<>
			<div className="flex	 ">
				<button
					onClick={() => setActiveModal('StartBattleModal')}
					disabled={subjectQuests == null}
					className="flex-1 px-4 py-2 mt-3 mx-2 bg-accent text-background rounded disabled:opacity-50 disabled:cursor-not-allowed"
				>
					START SESSION
				</button>
				<button
					onClick={() =>
						setActiveModal('StartBattleModal', { bossBattle: true })
					}
					disabled={subjectQuests == null || !availableBossFight}
					className={
						'flex-1 px-4 py-2 mt-3 mx-2  rounded disabled:opacity-50 disabled:cursor-not-allowed' +
						bosstBattleBtnStyles
					}
				>
					BOSS BATTLE
				</button>
			</div>
		</>
	);
}
