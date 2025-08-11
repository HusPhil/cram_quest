import { memo } from 'react';

interface ExperienceBarProps {
	value: number;
	max: number;
}

export function ProgressBar({ value, max }: ExperienceBarProps) {
	return (
		<div className="w-full space-y-2">
			<div className="relative h-2.5">
				{/* Background Bar */}
				<div className="absolute inset-0 bg-background rounded-full"></div>
				{/* Progress Bar */}
				<div
					className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent via-accent/80 to-accent/60 rounded-full transition-all duration-300"
					style={{ width: `${(value / max) * 100}%` }}
				></div>
			</div>
		</div>
	);
}

export default memo(ProgressBar);
