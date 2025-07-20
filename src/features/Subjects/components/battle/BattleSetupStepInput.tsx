import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

interface BattleSetupStepInputProps {
	id: string;
	value: string;
	index: number;
	onChange: (val: string) => void;
	onRemove: () => void;
	onAddNew: () => void;
	autoFocus: boolean;
	disableRemove: boolean;
}

export default function BattleSetupStepInput({
	id,
	value,
	index,
	onChange,
	onRemove,
	onAddNew,
	autoFocus,
	disableRemove,
}: BattleSetupStepInputProps) {
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (autoFocus && inputRef.current) {
			inputRef.current.focus();
		}
	}, [autoFocus]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			onAddNew();
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > 150) {
			toast.warn('Oops, keep things simple for now.', {
				toastId: 'step-description-too-long',
			});
			return;
		}

		onChange(e.target.value);
	};

	return (
		<div className="flex items-center space-x-2">
			<div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
				{index + 1}.
			</div>
			<input
				ref={inputRef}
				type="text"
				value={value}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				className="flex-grow p-2 text-white bg-secondary border border-accent border-text/20 rounded-md focus:border-accent focus:outline-none"
				placeholder={`Step ${index + 1}: What will you do?`}
			/>
			<button
				onClick={onRemove}
				className="p-1 text-text/50 hover:text-accent"
				disabled={disableRemove}
				title="Remove step"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
						clipRule="evenodd"
					/>
				</svg>
			</button>
		</div>
	);
}
