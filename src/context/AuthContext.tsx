import React, { createContext, useContext, useState } from 'react'

type AuthContextType = {
    accessToken: string;
    setAccessToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [accessToken, setAccessToken] = useState('')

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    )
} 


export function useAuth () {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context
}