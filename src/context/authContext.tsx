import { ReactNode, createContext, useContext, useState } from 'react';

interface AuthContextType {
	isAuthenticated: boolean;
	login: (username: string, password: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

interface AuthProviderProps {
	children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [isAuthenticated, setIsAuthenticated] = useState(() => {
		return localStorage.getItem('authToken') !== null;
	});

	const login = async (username: string, password: string) => {
		const response = await fetch('https://dummyjson.com/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username,
				password,
				expiresInMins: 30,
			}),
		});

		if (!response.ok) throw new Error('Invalid username or password');
		const data = await response.json();
		setIsAuthenticated(true);
		localStorage.setItem('authToken', data.token);
	};

	const logout = () => {
		setIsAuthenticated(false);
		localStorage.removeItem('authToken');
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
