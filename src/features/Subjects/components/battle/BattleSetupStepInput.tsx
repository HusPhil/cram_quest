import React, { useEffect, useRef } from 'react';
import { TbTrash } from 'react-icons/tb';
import { toast } from '../../../../lib/toastify/charLimitedToast';

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
			toast.warn("Let's keep things simple", {
				toastId: 'step-description-too-long',
			});
			return;
		}

		onChange(e.target.value);
	};

	return (
		<div className="flex items-center">
			<p className="flex-shrink-0 w-6 flex items-center justify-center">
				{index + 1}.
			</p>
			<div className="flex flex-1 items-center">
				<div className="w-full px-3">
					<input
						ref={inputRef}
						type="text"
						value={value}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						className="p-2 w-full  text-white bg-secondary border border-accent border-text/20 rounded-md focus:border-accent focus:outline-none"
						placeholder={`Step ${index + 1}: What will you do?`}
					/>
				</div>
				<button
					onClick={onRemove}
					className="flex-1 text-text/50 hover:text-accent"
					disabled={disableRemove}
					title="Remove step"
				>
					<TbTrash />
				</button>
			</div>
		</div>
	);
}
