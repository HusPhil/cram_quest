import { FaStar } from 'react-icons/fa';
import NamedGiIcon from '../../../components/NamedGiIcon';
import StarRating from './StarRating';

interface SubjectCardProps {
	subjectId: number;
	code_name: string;
	description: string;
	difficulty: number;
	onClick: () => void;
}

export default function SubjectCard({
	subjectId,
	code_name,
	description,
	difficulty,
	onClick,
}: SubjectCardProps) {
	// Function to determine glow effect based on difficulty
	const getDifficultyGlow = () => {
		if (difficulty >= 7) return 'animate-glow-red';
		if (difficulty >= 4) return 'animate-glow-orange';
		return 'animate-glow-purple';
	};

	return (
		<div
			onClick={onClick}
			className={`
				relative p-4 rounded-lg 
				bg-secondary/80 backdrop-blur-sm
				transition-all duration-300 hover:scale-105 cursor-pointer
				shadow-lg hover:shadow-xl
				flex flex-col gap-3 w-full 
			`}
		>
			{/* Subject Code Name */}
			<div className="flex items-center justify-between">
				<h3 className="text-xl font-rpg text-accent font-bold tracking-wider">
					{code_name}
				</h3>
			</div>
			{/* Description */}
			<p className="text-text/90 text-sm flex-grow overflow-hidden">
				{description}
			</p>

			{/* Divider */}
			<div className="h-0.5 w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

			{/* Difficulty Indicator */}
			<div className="flex items-center gap-1 mt-auto">
				<StarRating
					value={2}
					onChange={() => {}}
					className="gap-[1.5px]"
					starClassName="w-3 h-3"
				/>
			</div>
		</div>
	);
}
