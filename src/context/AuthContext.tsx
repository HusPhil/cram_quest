import React, { createContext, useContext, useState } from 'react';

type AuthContextType = {
	accessToken: string;
	setAccessToken: (token: string) => void;
	currentUserId: number | undefined;
	setCurrentUserId: (userId: number) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

interface CurrentUser {
	id: number;
	email: string;
	username: string;
}

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [accessToken, setAccessToken] = useState('');
	const [currentUserId, setCurrentUserId] = useState<number>();

	return (
		<AuthContext.Provider
			value={{
				accessToken,
				setAccessToken,
				currentUserId,
				setCurrentUserId,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within a AuthProvider');
	}
	return context;
}
