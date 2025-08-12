import { TbStarFilled } from 'react-icons/tb';

interface StarRatingProps {
	value: number;
	onChange?: (value: number) => void;
	editable?: boolean;
	displayOnly?: boolean;
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
	editable = false,
	displayOnly = true,
	max = 5,
}: StarRatingProps) {
	const stars = Array.from({ length: max }, (_, i) => {
		const rating = i + 1;
		const isActive = rating <= value;

		return (
			<TbStarFilled
				key={rating}
				className={`${starClassName} ${
					isActive ? 'text-amber-400' : 'text-gray-400'
				}`}
			/>
		);
	});

	if (displayOnly) {
		return (
			<div
				className={`flex gap-1 justify-center items-center ${className}`}
			>
				{stars}
			</div>
		);
	}

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
			aria-label="Star rating"
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
						<TbStarFilled
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
