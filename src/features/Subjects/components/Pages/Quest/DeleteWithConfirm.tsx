import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useDeleteQuest } from '../../../hooks/useDeleteQuest';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { QuestRead } from '../../../../../services/api/schema/quest_schema';

const DELETE_CONFIRMATION_SEC = 3;

interface DeleteWithConfirmProps {
	quest: QuestRead;
	setIsLoading: (isLoading: boolean) => void;
	queryKey: (string | number)[];
}

export default function DeleteWithConfirm({
	quest,
	setIsLoading,
	queryKey,
}: DeleteWithConfirmProps) {
	const queryClient = useQueryClient();

	const [timer, setTimer] = useState(DELETE_CONFIRMATION_SEC);
	const [isConfirming, setIsConfirming] = useState(false);
	const deleteQuestMutate = useDeleteQuest();

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
		setIsLoading(true);

		await deleteQuestMutate.mutateAsync({ questId: quest.id });

		if (deleteQuestMutate.isSuccess) toast.success('success at natawag');

		if (!deleteQuestMutate.isError) {
			queryClient.invalidateQueries({
				queryKey,
			});
			toast.success('Quest deleted successfully');
		}

		setIsLoading(false);
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
