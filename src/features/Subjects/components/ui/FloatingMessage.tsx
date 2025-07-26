import { useState, useEffect } from 'react';

export interface FloatingMessageData {
	text: string;
	variant?: 'default' | 'info' | 'success' | 'fail';
	id: number; // For the 'key' prop in React to force re-renders
}

interface FloatingMessageProps {
	messageData?: FloatingMessageData | null; // Now accepts a Message object or null
	duration?: number;
}

const FloatingMessage = ({
	messageData, // Renamed from 'message' to 'messageData'
	duration = 1000,
}: FloatingMessageProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const [displayContent, setDisplayContent] = useState(''); // Renamed to avoid confusion with messageData.text

	// Helper function to get text color classes based on variant
	const getVariantClasses = (
		variant: 'default' | 'info' | 'success' | 'fail'
	) => {
		switch (variant) {
			case 'info':
				return 'text-accent'; // Example info color
			case 'success':
				return 'text-success'; // Example success color
			case 'fail':
				return 'text-danger'; // Example fail color
			case 'default':
			default:
				return 'text-white'; // Default color
		}
	};

	useEffect(() => {
		if (messageData && messageData.text) {
			// Check for messageData and its text
			setDisplayContent(messageData.text);

			const initialShowTimer = setTimeout(() => {
				setIsVisible(true);
			}, 80);

			const timer = setTimeout(() => {
				setIsVisible(false);
				const hideTimer = setTimeout(() => {
					setDisplayContent('');
				}, 100);
				return () => clearTimeout(hideTimer);
			}, duration);

			return () => {
				clearTimeout(initialShowTimer);
				clearTimeout(timer);
			};
		} else {
			setIsVisible(false);
			setDisplayContent('');
		}
	}, [messageData, duration]); // Now depends on messageData object

	if (!displayContent) return null;

	// Determine the variant for color class based on messageData.variant
	const currentVariant = messageData?.variant || 'default';
	const variantColorClass = getVariantClasses(currentVariant);

	return (
		<small
			className={`
                text-sm
                absolute top-1/2 left-1/2
                transform -translate-x-1/2
                ${variantColorClass}
                font-bold text-center
                pointer-events-none z-10
                transition-all duration-100 ease-out
                ${
					isVisible
						? 'opacity-100 -translate-y-1/2'
						: 'opacity-0 translate-y-8'
				}
            `}
		>
			{displayContent}
		</small>
	);
};

export default FloatingMessage;
