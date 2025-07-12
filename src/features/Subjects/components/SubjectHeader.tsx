import React, { useState } from 'react';
import AddNewSubjectModal from '../modals/AddNewSubjectModal';
import { FaPlus } from 'react-icons/fa';

export default function SubjectHeader({
	playerId,
}: {
	playerId: number | undefined;
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	return (
		<>
			<div className="flex-none px-6 py-4 bg-secondary/30 border-b-2 border-accent/30">
				<div className="flex items-center justify-between mb-4">
					<h1 className="text-3xl font-rpg text-accent">Subjects</h1>
					<button
						disabled={!playerId}
						className="
								 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 disabled:bg-gray-500/50 disabled:border-gray-500/75 
								 bg-accent/20 hover:bg-accent/30
                                 disabled:text-gray-500 text-accent
								 border-2 border-accent/50 rounded-lg font-rpg
                                 transition-all duration-200 hover:scale-105 
                                 active:scale-95 focus:outline-none 
                                 focus:ring-2 focus:ring-accent/50 
                                 focus:ring-offset-2 focus:ring-offset-background
                                 flex items-center gap-2"
						onClick={() => setIsModalOpen(true)}
					>
						<FaPlus className={`w-3 h-3`} />
						<span className="hidden md:block">New Subject</span>
					</button>
				</div>
				<p className="text-text/80 font-rpg text-sm">
					Embark on your learning journey by creating and exploring
					subjects.
				</p>
				{playerId && (
					<AddNewSubjectModal
						playerId={playerId}
						isModalOpen={isModalOpen}
						setIsModalOpen={setIsModalOpen}
					/>
				)}
			</div>
		</>
	);
}
