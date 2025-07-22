import StarRating from './ui/StarRating';
import { useEffect, useRef, useState } from 'react';
import { putCursorToFront } from '../../../utils/putCursorToFront';
import { FaSliders } from 'react-icons/fa6';
import { useSubjectStore_UI } from '../stores/subjectStore_UI';

interface SubjectCardProps {
	index: number;
	playerId: number;
	subjectId: number;
	code_name: string;
	description: string;
	difficulty: number;
	onClick: () => void;
	onShowSettings?: (subjectId: number) => void;
	className?: string;
}

export default function SubjectCard({
	playerId,
	subjectId,
	code_name,
	description,
	difficulty,
	onClick,
	className,
}: SubjectCardProps) {
	// Function to determine glow effect based on difficulty

	const setActiveModal = useSubjectStore_UI((state) => state.setActiveModal);

	const [isLoading] = useState(false);

	const [isEditEnabled] = useState(false);

	const codeNameRef = useRef<HTMLHeadingElement | null>(null);

	useEffect(() => {
		if (isEditEnabled && codeNameRef.current) {
			putCursorToFront(codeNameRef.current);
			codeNameRef.current.focus();
		}
	}, [isEditEnabled]);

	return (
		<>
			<div
				tabIndex={0}
				onClick={onClick}
				className={`
				border border-white/10
				active:scale-90 
				relative rounded-lg 
				bg-secondary/80 
				transition-all duration-300 
				flex flex-col gap-3 w-full
				${isLoading ? 'opacity-30 pointer-events-none' : ''}
				${className} 
			`}
			>
				{/* Subject Code Name */}
				<div className="flex justify-between  items-start pt-4 px-4 cursor-pointer">
					<div className="flex-1">
						<div className="flex items-center justify-between">
							<h3
								ref={codeNameRef}
								contentEditable={isEditEnabled}
								className={`text-xl font-rpg text-accent font-bold tracking-wider
								${
									isEditEnabled
										? 'bg-yellow-100 p-1 border-yellow-400 text-background'
										: 'border-transparent'
								} `}
							>
								{code_name}
							</h3>
						</div>
						{/* Description */}
						<p
							contentEditable={isEditEnabled}
							className={` text-sm opacity-75 py-1 flex-grow overflow-hidden line-clamp-2`}
						>
							{description}
						</p>
					</div>
				</div>

				{/* Divider */}
				<div className="h-0.5 w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

				{/* Difficulty Indicator */}
				<div className="flex items-end justify-between gap-1 cursor-pointer  flex-1">
					<div
						className={`${
							isEditEnabled ? '' : 'flex-1'
						} pb-4 px-4 `}
					>
						<StarRating
							value={difficulty}
							className={`transition-all duration-300 ease-in-out ${
								isEditEnabled
									? 'bg-yellow-100 gap-x-1 border-yellow-400 border-2 p-1 scale-125'
									: 'scale-100'
							}`}
							starClassName="w-3 h-3"
						/>
					</div>
					<button
						className="pb-4 px-4"
						onClick={(e) => {
							e.stopPropagation();
							setActiveModal('EditSubjectModal', {
								code_name,
								description,
								difficulty,
								player_id: playerId,
								id: subjectId,
							});
						}}
					>
						<FaSliders className="w-4 h-4 " />
					</button>
				</div>
			</div>
		</>
	);
}
