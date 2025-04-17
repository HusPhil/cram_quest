import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRequireAuth } from '../features/Auth/hooks/useRequireAuth';

const RequireAuth = () => {
	const [authChecked, setAuthChecked] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const requireAuthMutate = useRequireAuth();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await requireAuthMutate.mutateAsync();
				setIsAuthenticated(true);
			} catch (err) {
				setIsAuthenticated(false);
			} finally {
				setAuthChecked(true);
			}
		};

		checkAuth();
	}, []);

	if (!authChecked) return null; // Or a loading spinner

	return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default RequireAuth;
