import { GiRoundStar } from 'react-icons/gi';

interface StarRatingProps {
	value: number;
	onChange: (value: number) => void;
	editable?: boolean;
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
	editable = true,
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
						className={`cursor-pointer focus:outline-none ${
							editable ? 'focus:ring-2 focus:ring-amber-400' : ''
						}`}
						tabIndex={editable ? 0 : -1}
						onKeyDown={(e) => {
							if (!editable) return;
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
							value={rating}
							hidden
							onChange={() => editable && onChange(rating)}
							checked={value === rating}
							className="sr-only"
							disabled={!editable}
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
