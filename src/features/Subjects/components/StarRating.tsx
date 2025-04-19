import { GiRoundStar } from 'react-icons/gi';

interface StarRatingProps {
	value: number;
	onChange: (value: number) => void;
	max?: number;
	className?: string;
	starClassName?: string;
	onKeyDown?: (e: React.KeyboardEvent) => void;
}

export default function StarRating({
	className,
	starClassName,
	value,
	onChange,
	onKeyDown,
	max = 5,
}: StarRatingProps) {
	return (
		<fieldset
			className={`flex gap-1" aria-label="Star rating ${className}`}
		>
			{[...Array(max)].map((_, i) => {
				const rating = i + 1;
				return (
					<label
						key={rating}
						className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
						tabIndex={0}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								onChange(rating);
							} else if (e.key === 'Escape') {
								e.preventDefault();
								onKeyDown?.(e);
							}
						}}
					>
						<input
							type="radio"
							name="rating"
							onKeyDown={(e: React.KeyboardEvent) => {
								if (e.key === 'Esape') {
									onKeyDown?.(e);
								}
							}}
							value={rating}
							hidden
							onChange={() => onChange(rating)}
							checked={value === rating}
							className="sr-only"
						/>

						<GiRoundStar
							className={`${starClassName} ${
								rating <= value
									? 'text-amber-400'
									: 'text-gray-400'
							}`}
						/>
					</label>
				);
			})}
		</fieldset>
	);
}
