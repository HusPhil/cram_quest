// src/contexts/FloatingScreenContext.tsx
import React, { createContext, useContext, useState } from 'react';

type FloatingScreenContextType = {
	isScreenOpen: boolean;
	openScreen: () => void;
	closeScreen: () => void;
	toggleScreen: () => void;
	setContent: (content: React.ReactNode) => void;
	screenContent: React.ReactNode;
};

const FloatingScreenContext = createContext<
	FloatingScreenContextType | undefined
>(undefined);

export const FloatingScreenProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [isScreenOpen, setIsOpen] = useState(false);
	const [screenContent, setScreenContent] = useState<React.ReactNode>(null);

	const openScreen = () => setIsOpen(true);
	const closeScreen = () => setIsOpen(false);
	const toggleScreen = () => setIsOpen((prev) => !prev);
	const setContent = (content: React.ReactNode) => setScreenContent(content);

	return (
		<FloatingScreenContext.Provider
			value={{
				isScreenOpen,
				openScreen,
				closeScreen,
				toggleScreen,
				setContent,
				screenContent,
			}}
		>
			{children}
		</FloatingScreenContext.Provider>
	);
};

export const useFloatingScreen = () => {
	const context = useContext(FloatingScreenContext);
	if (!context) {
		throw new Error(
			'useFloatingScreen must be used within a FloatingScreenProvider'
		);
	}
	return context;
};
