import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const DELETE_CONFIRMATION_SEC = 3;

interface DeleteWithConfirmProps {
	deleteFn: () => Promise<void>;
	setIsDeleting: (isLoading: boolean) => void;
}

export default function DeleteWithConfirm({
	deleteFn,
	setIsDeleting,
}: DeleteWithConfirmProps) {
	const [timer, setTimer] = useState(DELETE_CONFIRMATION_SEC);
	const [isConfirming, setIsConfirming] = useState(false);

	const handleDeleteClick = () => {
		if (isConfirming) {
			handleDeleteConfirmed();
			setIsConfirming(false);
			setTimer(DELETE_CONFIRMATION_SEC);
		} else {
			setIsConfirming(true);
			setTimer(DELETE_CONFIRMATION_SEC);
		}
	};

	const handleDeleteConfirmed = async () => {
		setIsDeleting(true);

		await deleteFn();

		setIsDeleting(false);
	};

	useEffect(() => {
		if (!isConfirming) return;

		const interval = setInterval(() => {
			setTimer((prev) => {
				if (prev <= 1) {
					clearInterval(interval);
					setIsConfirming(false);
					setTimer(DELETE_CONFIRMATION_SEC);
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [isConfirming]);

	return (
		<button
			className={`group px-1 flex items-center gap-1 text-xs 
                    transition-width duration-300 ease-in-out
                    ${isConfirming ? 'text-primary px-3 py-1 mt-1' : ''}`}
			onClick={handleDeleteClick}
		>
			{isConfirming ? (
				<div className="flex items-center gap-2">
					<p className="text-primary px-3 py-1  bg-primary/20 rounded-md">{`Confirm (${timer}s)`}</p>
				</div>
			) : (
				<FaTrash className="w-3 h-3 text-primary/80" />
			)}
		</button>
	);
}
