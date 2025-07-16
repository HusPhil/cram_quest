import { GiRoundStar } from 'react-icons/gi';

interface StarRatingProps {
	value: number;
	onChange?: (value: number) => void;
	editable?: boolean;
	max?: number;
	className?: string;
	starClassName?: string;
	onKeyDown?: (e: React.KeyboardEvent) => void;
}

export default function StarRating({
	className = '',
	starClassName = '',
	value,
	onChange,
	onKeyDown,
	editable = true,
	max = 5,
}: StarRatingProps) {
	const handleKeyDown = (e: React.KeyboardEvent, rating: number) => {
		if (!editable) return;
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onChange?.(rating);
		} else if (e.key === 'Escape') {
			e.preventDefault();
			onKeyDown?.(e);
		}
	};

	const handleChange = (rating: number) => {
		if (editable) {
			onChange?.(rating);
		}
	};

	return (
		<fieldset
			className={`flex gap-1 ${className}`}
			aria-label={`Star rating`}
		>
			{Array.from({ length: max }, (_, i) => {
				const rating = i + 1;
				const isActive = rating <= value;
				return (
					<label
						key={rating}
						className={`cursor-pointer focus:outline-none ${
							editable ? 'focus:ring-2 focus:ring-amber-400' : ''
						}`}
						tabIndex={editable ? 0 : -1}
						onKeyDown={(e) => handleKeyDown(e, rating)}
					>
						<input
							type="radio"
							name="rating"
							value={rating}
							hidden
							onChange={() => handleChange(rating)}
							checked={value === rating}
							className="sr-only"
							disabled={!editable}
						/>

						<GiRoundStar
							className={`${starClassName} ${
								isActive ? 'text-amber-400' : 'text-gray-400'
							}`}
						/>
					</label>
				);
			})}
		</fieldset>
	);
}
