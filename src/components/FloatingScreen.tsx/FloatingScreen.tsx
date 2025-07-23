import React, { useMemo } from 'react';
import { useFloatingScreen } from '../../context/FloatingScreenContext';

interface FloatingScreenProps {
	children?: React.ReactNode;
	className?: string;
}

const FloatingScreen = React.memo(function FloatingScreen({
	className,
}: FloatingScreenProps) {
	const { isScreenOpen, screenContent } = useFloatingScreen();

	// Memoize the computed class names
	const containerClassName = useMemo(
		() =>
			`absolute inset-0 z-50 bg-background transition-all duration-500 ease-in-out ${
				isScreenOpen
					? 'translate-y-0 opacity-100 pointer-events-auto'
					: 'translate-y-full opacity-0 pointer-events-none'
			}`,
		[isScreenOpen]
	);

	const contentClassName = useMemo(
		() => `flex flex-col h-full w-full items-center ${className}`,
		[className]
	);

	return (
		<div className={containerClassName}>
			<div className={contentClassName}>
				{isScreenOpen && screenContent}
			</div>
		</div>
	);
});

export default FloatingScreen;
