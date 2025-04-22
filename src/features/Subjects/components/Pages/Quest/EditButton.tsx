import { FaFloppyDisk, FaPenToSquare } from 'react-icons/fa6';

interface EditButtonProps {
	isEditEnabled: boolean;
	isEditing: boolean;
	setIsEditEnabled: (isEditEnabled: boolean) => void;
	setIsEditing: (isLoading: boolean) => void;
	updateFn: () => Promise<void>;
}

export default function EditButton({
	isEditEnabled,
	isEditing,
	setIsEditEnabled,
	setIsEditing,
	updateFn,
}: EditButtonProps) {
	const handleUpdateQuest = async () => {
		setIsEditing(true);

		await updateFn();

		setIsEditing(false);
	};

	return (
		<div className="shrink-0">
			<button
				onClick={async () => {
					if (!isEditEnabled) {
						setIsEditEnabled(true);
						return;
					}

					await handleUpdateQuest();
					setIsEditEnabled(false);
				}}
				disabled={isEditing}
				className="mt-1 shrink-0"
			>
				{isEditEnabled ? (
					<FaFloppyDisk
						className="text-accent"
						onClick={handleUpdateQuest}
					/>
				) : (
					<FaPenToSquare />
				)}
			</button>
		</div>
	);
}
