import React from 'react';
import { FaStar } from 'react-icons/fa';

interface SubjectCardProps {
	code_name: string;
	description: string;
	difficulty: number;
	onClick: () => void;
}

export default function SubjectCard({
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

	// Function to render difficulty stars
	const renderDifficultyStars = () => {
		const stars = [];
		for (let i = 0; i < difficulty; i++) {
			stars.push(
				<FaStar
					key={i}
					className={`text-accent ${
						i < 3
							? 'opacity-100'
							: i < 5
							? 'opacity-80'
							: 'opacity-60'
					}`}
				/>
			);
		}
		return stars;
	};

	return (
		<div
			onClick={onClick}
			className={`
				relative p-4 rounded-lg border border-crystal-border/30
				bg-secondary/80 backdrop-blur-sm
				transition-all duration-300 hover:scale-105 cursor-pointer
				shadow-lg hover:shadow-xl
				flex flex-col gap-3 h-[200px] w-full 
			`}
		>
			{/* Subject Code Name */}
			<div className="flex items-center justify-between">
				<h3 className="text-xl font-rpg text-crystal-light font-bold tracking-wider">
					{code_name}
				</h3>
			</div>

			{/* Divider */}
			<div className="h-0.5 w-full bg-gradient-to-r from-transparent via-crystal-border/30 to-transparent" />

			{/* Description */}
			<p className="text-text/90 text-sm flex-grow overflow-hidden">
				{description}
			</p>

			{/* Difficulty Indicator */}
			<div className="flex items-center gap-1 mt-auto">
				<span className="text-xs text-text/70 mr-2">Difficulty:</span>
				<div className="flex gap-1">{renderDifficultyStars()}</div>
			</div>
		</div>
	);
}
