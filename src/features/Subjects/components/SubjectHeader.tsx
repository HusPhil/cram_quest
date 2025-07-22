import { FaPlus } from 'react-icons/fa';
import { useSubjectStore_UI } from '../stores/subjectStore_UI';
import PixelButton from '../../../components/PixelButton';
import colors from '../../../data/colors';
import { TbPlus } from 'react-icons/tb';

export default function SubjectHeader({
	playerId,
}: {
	playerId: number | undefined;
}) {
	const activeModal = useSubjectStore_UI((state) => state.activeModal);
	const setActiveModal = useSubjectStore_UI((state) => state.setActiveModal);

	return (
		<>
			<div className="flex-none px-7 py-5 bg-background">
				{/* CALL TO ACTION BUTTON AND THE HEADER TITLE */}
				<div className="flex items-center justify-between mb-4">
					<h1 className="text-3xl font-rpg text-accent">Subjects</h1>
					<button
						disabled={!playerId}
						className="
								 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 disabled:bg-gray-500/50 disabled:border-gray-500/75 
								 bg-accent/20 hover:bg-accent/30
                                 disabled:text-gray-500 text-accent
								 border border-accent rounded-md
                                 transition-all duration-200 hover:scale-105 active:scale-90 focus:outline-none 
                                 flex items-center gap-1"
						onClick={() => setActiveModal('AddNewSubjectModal')}
					>
						<TbPlus className={`w-4 h-4`} />
						<p className="hidden md:block">New Subject</p>
					</button>
				</div>

				{/* SHORT DESC */}
				<p className="text-text/80 font-rpg text-sm">
					Embark on your learning journey by creating and exploring
					subjects.
				</p>
			</div>
		</>
	);
}
