import { useEffect, useRef } from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, [onClose]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-secondary/80 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal Container */}
			<div
				ref={modalRef}
				className="relative z-50 w-11/12 max-w-md transform rounded-lg border-2 border-accent "
			>
				{/* accent-like gradient background */}
				<div className="relative rounded-lg bg-gradient-to-br from-background via-secondary to-background p-1">
					<div className="rounded-lg bg-background/95 p-6">
						{/* Header */}
						<div className="mb-4 flex items-center justify-between">
							<h3 className="font-rpg text-xl text-accent">
								{title}
							</h3>
							<button
								onClick={onClose}
								className="rounded-full p-1 text-text hover:bg-primary/20 hover:text-primary transition-colors"
							>
								<svg
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>

						{/* Content */}
						<div className="text-text">{children}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
