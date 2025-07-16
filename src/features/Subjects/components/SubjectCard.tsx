import StarRating from './StarRating';
import { useEffect, useRef, useState } from 'react';
import { putCursorToFront } from '../../../utils/putCursorToFront';
import ViewSettingsModal from '../modals/ViewSettingsModal';
import { FaSliders } from 'react-icons/fa6';

interface SubjectCardProps {
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

	const [isLoading] = useState(false);

	const [isEditEnabled] = useState(false);

	const codeNameRef = useRef<HTMLHeadingElement | null>(null);

	useEffect(() => {
		if (isEditEnabled && codeNameRef.current) {
			putCursorToFront(codeNameRef.current);
			codeNameRef.current.focus();
		}
	}, [isEditEnabled]);

	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<div
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === 'Enter' && !isEditEnabled) {
						onClick();
					}
				}}
				className={`
				active:scale-90
				focus:ring focus:ring-amber-400
				relative rounded-lg 
				bg-secondary/80 
				transition-all duration-300 
				hover:shadow-xl
				flex flex-col gap-3 w-full
				${isLoading ? 'opacity-30 pointer-events-none' : ''}
				${className} 
			`}
			>
				{/* Subject Code Name */}
				<div
					onClick={isEditEnabled ? undefined : onClick}
					className="flex justify-between  items-start pt-4 px-4 cursor-pointer"
				>
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
							className={` text-sm flex-grow overflow-hidden line-clamp-2`}
						>
							{description}
						</p>
					</div>
				</div>

				{/* Divider */}
				<div
					onClick={onClick}
					className="h-0.5 w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent"
				/>

				{/* Difficulty Indicator */}
				<div className="flex items-center justify-between gap-1 cursor-pointer">
					<div
						className={`${
							isEditEnabled ? '' : 'flex-1'
						} pb-4 px-4 `}
						onClick={isEditEnabled ? undefined : onClick}
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
					<div
						className="pb-4 px-4"
						onClick={() => setIsModalOpen(true)}
					>
						<FaSliders className="w-4 h-4 " />
					</div>
				</div>
			</div>
			<ViewSettingsModal
				playerId={playerId}
				subjectId={subjectId}
				isModalOpen={isModalOpen}
				initialSettingConfig={{
					codeName: code_name,
					description,
					difficulty,
				}}
				setIsModalOpen={setIsModalOpen}
			/>
		</>
	);
}
