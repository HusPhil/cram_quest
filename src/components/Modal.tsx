import React, { useEffect, useRef } from 'react';

interface ModalProps {
	isOpen: boolean;
	title: string;
	children: React.ReactNode;
	onClose: () => void;
	lock?: boolean;
	disabledEsc?: boolean;
	customHeader?: React.ReactNode;
	variant?: 'primary' | 'success' | 'danger';
}

const getBorderFromVariant = (variant: 'primary' | 'success' | 'danger') => {
	switch (variant) {
		case 'success':
			return 'border-success';
		case 'danger':
			return 'border-danger';
		case 'primary':
		default:
			return 'border-accent';
	}
};

const Modal = ({
	isOpen,
	onClose,
	lock,
	disabledEsc,
	title,
	children,
	customHeader,
	variant = 'primary',
}: ModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				if (!lock && !disabledEsc) {
					e.preventDefault();
					onClose();
				}
			}
		};

		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, [onClose, lock, disabledEsc]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center h-[100dvh]">
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-secondary/80 backdrop-blur-sm"
				onClick={!lock ? onClose : undefined}
			/>

			{/* Modal Container */}
			<div
				ref={modalRef}
				className={`relative z-50 w-11/12 max-w-[500px] transform rounded-lg max-h-[80%] overflow-auto border ${getBorderFromVariant(
					variant
				)}`}
			>
				{/* accent-like gradient background */}
				<div className="relative p-1 bg-background">
					<div className="rounded-lg bg-background/95 p-6">
						{/* Header */}
						{customHeader || (
							<>
								<div className="mb-4 flex items-center justify-between">
									<h3 className="font-rpg text-xl text-accent">
										{title}
									</h3>
									<button
										onClick={onClose}
										className="rounded-full p-1 text-text hover:bg-danger/20 hover:text-danger transition-colors"
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
								{/* <hr className="bg-accent/25 border-none h-[0.5px] mb-3" /> */}
							</>
						)}

						{/* Content */}
						<div className="text-text">{children}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
